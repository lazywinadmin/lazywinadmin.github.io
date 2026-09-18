---
layout: single
title: "Host a remote MCP server on Azure Container Apps for Microsoft Foundry agents"
excerpt: "Warm-up: deploy Azure MCP Server on Azure Container Apps with azd and managed identity, then connect a Microsoft Foundry agent over HTTPS"
permalink:
tags:
  - azure
  - mcp
  - foundry
  - containerapps
  - agents
  - devops
categories:
published: true
comments: true
header:
  teaserlogo:
  teaser: ''
  image: images/headers/mountain01_1920x500.jpg
  caption:
gallery:
  - image_path: ''
    url: ''
    title: ''
toc: true
toc_label: "Table of content"
toc_sticky: true
toc_icon: "terminal"
---

{% capture mynote%}
**Warm-up post** — based on Microsoft's public `azmcp-foundry-aca-mi` template and the [Deploy remote MCP + Foundry](https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/how-to/deploy-remote-mcp-server-microsoft-foundry) guide. Azure MCP Server is evolving quickly (2.0-beta at time of writing); treat commands and portal clicks as living docs.
{% endcapture %}
{{mynote}}{: .notice--info}

Model Context Protocol (MCP) is how agents discover and call tools over a standard interface. Most demos run MCP **locally** next to the model. That is fine for a laptop. Production agents need a **remote** MCP endpoint over HTTPS, with identity you can audit.

This post is a short warm-up for that pattern on Azure, using **azd** and **managed identity**:

1. Host **Azure MCP Server** on **Azure Container Apps**
2. Authenticate outbound calls to Azure Storage with the Container App **managed identity**
3. Authenticate inbound agent calls with **Microsoft Entra** and the Foundry project's **managed identity**
4. Wire the endpoint into a **Microsoft Foundry** agent as an MCP tool

I am following Microsoft's reference `azd` template [`Azure-Samples/azmcp-foundry-aca-mi`](https://github.com/Azure-Samples/azmcp-foundry-aca-mi). The sample enables the **storage** tool namespace in read-only mode. Same shape applies when you open other Azure MCP namespaces later.

## Why remote MCP (and why ACA)

| Concern | Local MCP | Remote MCP on ACA |
| --- | --- | --- |
| Who can call tools | Your laptop / IDE | Foundry agents, Copilot Studio, other HTTPS clients |
| Auth | Often none or a personal token | Entra app + project managed identity |
| Blast radius | Whatever your user can do | Scoped RBAC on a specific Storage account (in this template) |
| Ops | Restart your machine | Container App revision, App Insights, `azd down` |

For platform teams, remote MCP is closer to an **API you vend** than a plugin you install.

## What you need

- Azure subscription with **Owner** or **User Access Administrator** (role assignments + Entra app)
- [Azure Developer CLI (`azd`)](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd)
- An existing **Azure Storage account** (resource ID)
- An existing **Microsoft Foundry project** (resource ID)
- Comfort with `azd init` / `azd up` / `azd down`

The template does **not** create the Storage account or the Foundry project. You bring those IDs in — same idea as BYOR in AI landing zones.

## Architecture in one paragraph

`azd up` deploys a Container App running Azure MCP Server (storage tools), gives that app's managed identity **Reader** + **Storage Blob Data Reader** on your Storage account, creates an Entra app registration with an app role (`Mcp.Tools.ReadWrite.All` in the sample), and assigns that role to the Foundry project's managed identity. Foundry agents then call `CONTAINER_APP_URL` with **Project Managed Identity**, using the Entra app's identifier URI as the audience.

```text
Foundry agent  --(Entra MI)-->  Entra app (audience)
                                      |
                                      v
                            Container App (Azure MCP Server)
                                      |
                          (MI: Reader + Blob Data Reader)
                                      v
                               Your Storage account
```

## Deploy with azd

```bash
# Initialize from the public template
azd init -t azmcp-foundry-aca-mi

# Provision + deploy (prompts for subscription, Foundry project ID, Storage account ID, resource group)
azd up
```

When `azd` finishes, grab the outputs:

```bash
azd env get-values
```

You care about at least:

```bash
CONTAINER_APP_URL="https://azure-mcp-storage-server.<env>.<region>.azurecontainerapps.io"
ENTRA_APP_CLIENT_ID="<guid>"
ENTRA_APP_IDENTIFIER_URI="api://<guid>"
```

Keep those values out of git. Treat them like any other environment secret.

{% capture mynote2%}
**Audience value:** Microsoft Learn's Foundry connection steps use `ENTRA_APP_IDENTIFIER_URI` (often `api://<client-id>`) as the **Audience**. The sample README also shows the client ID in places — if the portal rejects one form, try the identifier URI from `azd env get-values` first.
{% endcapture %}
{{mynote2}}{: .notice--warning}

### What the template actually creates

From the sample / Learn docs:

- **Container App** — hosts Azure MCP Server with the storage namespace
- **RBAC on Storage** — Container App MI: Reader + Storage Blob Data Reader
- **Entra app registration** — OAuth for inbound agent calls; custom app role assigned to the Foundry project MI
- **Application Insights** — telemetry (when enabled in the template)

Bicep under the hood is worth a skim if you plan to fold this into a landing zone later: `main.bicep`, `aca-infrastructure.bicep`, `entra-app.bicep`, role-assignment modules, and optional App Insights.

## Connect a Foundry agent

After deploy:

1. Open your Foundry project: [https://ai.azure.com/nextgen](https://ai.azure.com/nextgen)
2. **Build** → **Create agent**
3. In **Tools**, **+ Add** → **Custom** → **Model Context Protocol** → **Create**
4. Set:
   - **Remote MCP Server** → `CONTAINER_APP_URL`
   - **Authentication** → Microsoft Entra → **Project Managed Identity**
   - **Audience** → `ENTRA_APP_IDENTIFIER_URI`
5. **Connect**

Ask the agent something that needs Storage read tools (list containers / blobs in the account you granted). If identity or RBAC is wrong, you will feel it immediately as auth failures rather than “hallucinated” storage answers — that is a feature.

## Platform notes

A few things I would nail before promoting this beyond a lab:

- **Least privilege outbound** — this sample is read-only on one Storage account. Opening write namespaces or “all subscriptions” tools is a different risk conversation.
- **Least privilege inbound** — only the Foundry project MI gets the MCP app role. Do not spray that role across every identity in the tenant.
- **Network** — the public sample is HTTPS on ACA. Private MCP (internal ingress, dedicated subnet, private Foundry patterns) is the next post / landing-zone story.
- **Org Entra policies** — some tenants require `serviceManagementReference` on app registrations. If `azd up` fails with that Graph error, set the GUID in `infra/main.parameters.json` and re-run (documented in the sample README).
- **Cleanup** — labs should die on purpose:

```bash
azd down
```

## Resources

- [Deploy Azure MCP Server as a remote MCP server and connect with Microsoft Foundry](https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/how-to/deploy-remote-mcp-server-microsoft-foundry)
- [Azure-Samples/azmcp-foundry-aca-mi](https://github.com/Azure-Samples/azmcp-foundry-aca-mi)
- [Azure MCP Server commands / namespaces](https://github.com/microsoft/mcp/blob/main/servers/Azure.Mcp.Server/docs/azmcp-commands.md)
- [Azure AI Landing Zones](https://azure.github.io/AI-Landing-Zones/) (where this pattern belongs at enterprise scale)

## Next

This was the warm-up: public remote MCP + Foundry MI. The natural follow-ups on this blog are private-network MCP, and packing Foundry into an **AI Landing Zone** with Terraform BYOR for Key Vault / Storage / Cosmos / AI Search.


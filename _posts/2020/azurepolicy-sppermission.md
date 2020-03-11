az ad sp create-for-rbac --role="Contributor" --scopes="/subscriptions/<subID>"
az role assignment create --assignee <appid> --role 'Resource Policy Contributor'
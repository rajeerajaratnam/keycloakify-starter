<#outputformat "HTML">
<#assign fullName = user.firstName + " " + user.lastName>
<#assign email = user.email>
<#assign tempPassword = (user.attributes.temporarypassword[0])!''>
</#outputformat>

<#import "template.ftl" as layout>
<@layout.emailLayout>
    ${kcSanitize(msg("executeActionsBodyHtml", link, linkExpiration, realmName, linkExpirationFormatter(linkExpiration), fullName, email, tempPassword))?no_esc}
</@layout.emailLayout>


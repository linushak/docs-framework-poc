# Breaking changes

From with this version, the name of some components of Gravitee.io APIM
changes. As a consequence, the following plugins are renamed :

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>before 3.9.3</p></td>
<td style="text-align: left;"><p>after 3.9.3</p></td>
</tr>
<tr class="even">
<td
style="text-align: left;"><p>gravitee.repository.mongodb-3.9.x.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.mongodb-3.9.x.zip</p></td>
</tr>
<tr class="odd">
<td
style="text-align: left;"><p>gravitee.repository.jdbc-3.9.x.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.jdbc-3.9.x.zip</p></td>
</tr>
<tr class="even">
<td
style="text-align: left;"><p>gravitee.repository.redis-3.9.x.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.redis-3.9.x.zip</p></td>
</tr>
<tr class="odd">
<td
style="text-align: left;"><p>gravitee.repository.hazelcast-3.9.x.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.hazelcast-3.9.x.zip</p></td>
</tr>
<tr class="even">
<td
style="text-align: left;"><p>gravitee.repository.gateway.bridge.http.client-3.9.x.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.gateway.bridge.http.client-3.9.x.zip</p></td>
</tr>
<tr class="odd">
<td
style="text-align: left;"><p>gravitee.repository.gateway.bridge.http.server-3.9.x.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.gateway.bridge.http.server-3.9.x.zip</p></td>
</tr>
</tbody>
</table>

These plugins have also been moved in another folder on
<https://download.gravitee.io>. For instance, the MongoDB plugin is now
available using this link:

<https://download.gravitee.io/graviteeio-apim/plugins/repositories/gravitee-apim-repository-mongodb/gravitee-apim-repository-mongodb-3.9.3.zip>

In future versions, others plugins will be renamed. Stay tuned!
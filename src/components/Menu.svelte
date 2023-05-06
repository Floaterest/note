<script lang="ts">
    import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
    export let map = new Map();
</script>

<Accordion>
    {#each Array.from(map.entries()) as [key, val]}
        <Panel variant="outlined">
            <Header><a href={key + '/'}>{key}/</a></Header>
            <Content>
                <ul>
                    {#each val as { href, title }}
                        <li><a href={key + '/' + href}>{title ?? href}</a></li>
                    {/each}
                </ul>
            </Content>
        </Panel>
    {/each}
</Accordion>

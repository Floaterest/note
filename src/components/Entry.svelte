<script lang="ts">
    import { Panel, Header, Content } from '@smui-extra/accordion';
    export let title: string = '';
</script>

<Panel open variant="outlined" color="secondary" width="100%">
    <Header><h1>{title}</h1></Header>
    <Content>
        <slot />
    </Content>
</Panel>

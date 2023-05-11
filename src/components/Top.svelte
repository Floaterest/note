<script lang="ts">
    import Drawer, { AppContent, Scrim } from '@smui/drawer';
    import TopAppBar, {
        Row,
        Section,
        Title,
        AutoAdjust,
    } from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
    // import Select, { Option } from '@smui/select';

    export let value = '';
    // export let collections: string[] = [];

    let open = false;
    let topAppBar: TopAppBar;
    const toggle = () => (open = !open);
</script>

<!-- short fixed standard static -->
<TopAppBar bind:this={topAppBar} variant="fixed">
    <Row>
        <Section>
            <IconButton class="material-icons-round" on:click={toggle}>
                menu
            </IconButton>
            <Title>{value}</Title>
        </Section>
        <Section align="end" toolbar>
            <IconButton class="material-icons-round">
                <a href="../">arrow_back</a>
            </IconButton>
        </Section>
    </Row>
</TopAppBar>
<AutoAdjust {topAppBar}>
    <Drawer variant="modal" bind:open on:click={toggle}>
        <slot name="drawer">please</slot>
    </Drawer>
    <Scrim/>
    <AppContent>
        <slot name="content" />
    </AppContent>
</AutoAdjust>

# Breaking Changes

## Portal UI

The variables css of `gv-link` component has been modified to improve
the theme’s customization. Now the component uses :

-   Active border color `--gv-link-active--bdc` instead of Active border
    bottom color `--gv-link-active--bdbc`

-   Active border style `--gv-link-active--bds` instead of Active border
    bottom style `--gv-link-active--bdbs`

-   Active border width `--gv-link-active--bdw` instead of Active border
    bottom width `--gv-link-active--bdbw`

For example, if you has set `--gv-link-active--bdbw=3px`, now you should
set `--gv-link-active--bdw=0 0 3px 0`

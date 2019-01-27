import Vue, { CreateElement, VNode, PluginFunction } from 'vue';
import {
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Watch,
} from 'vue-property-decorator';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import {
  FontAwesomeIcon,
  FontAwesomeLayers as FaLayers,
  FontAwesomeLayersText as FaLayersText,
} from '@fortawesome/vue-fontawesome';

config.autoAddCss = false;

let modulesLoading = false;
let modulesLoaded = false;
const instances: FaIcon[] = [];

async function load(icon?: FaIcon): Promise<void> {
  if (modulesLoaded) {
    if (icon) {
      icon.loaded = true;
    }

    return;
  }

  if (icon) {
    instances.push(icon);
  }

  if (modulesLoading) {
    return;
  }
  modulesLoading = true;

  try {
    const [{ fab }, { far }, { fas }] = await Promise.all([
      import(/* webpackChunkName: "fab" */ '@fortawesome/free-brands-svg-icons'),
      import(/* webpackChunkName: "far" */ '@fortawesome/free-regular-svg-icons'),
      import(/* webpackChunkName: "fas" */ '@fortawesome/free-solid-svg-icons'),
    ]);
    library.add(fab, far, fas);

    for (const cur of instances) {
      cur.loaded = true;
    }
    instances.splice(0, instances.length);

    modulesLoading = false;
    modulesLoaded = true;
  } catch (error) {
    console.error(error);
  }
}

/**
 * FontAwesome Icon
 */
@Component({
  components: {
    FontAwesomeIcon,
  },
  props: FontAwesomeIcon.props,
})
class FaIcon extends Vue {
  public loaded: boolean = false;
  private mounted(): void {
    if (modulesLoaded) {
      this.loaded = true;
    } else {
      // tslint:disable
      load(this);
      // tslint:enable
    }
  }

  private render(h: CreateElement): VNode {
    return this.loaded
      ? h('font-awesome-icon', { props: this.$props })
      : h('i', {
          staticClass: 'svg-inline--fa fa-w-16',
          attrs: { 'aria-hidden': 'true', role: 'img' },
        });
  }
}

export { FaIcon, FaLayers, FaLayersText };

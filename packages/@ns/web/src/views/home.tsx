import Vue, { CreateElement, VNode } from 'vue';
import {
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Watch,
} from 'vue-property-decorator';

/**
 * Component: home
 */
@Component
export default class VHome extends Vue {
  private render(h: CreateElement): VNode {
    return (
      <div staticClass="v-home">
        <vd-swimlane>
          <vd-container>
            <vd-flexbox justify="center">home</vd-flexbox>
          </vd-container>
        </vd-swimlane>
      </div>
    );
  }
}

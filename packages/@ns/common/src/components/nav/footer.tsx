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
import { ClassName, Theme, ThemeComponent } from 'void-ui';

const groups = [
  {
    label: 'Group 1',
    items: [
      {
        label: 'item',
        href: '/item',
      },
      {
        label: 'item',
        href: '/item',
      },
      {
        label: 'item',
        href: '/item',
        blank: true,
      },
      {
        label: 'item',
        href: '/item',
        external: true,
      },
    ],
  },
  {
    label: 'Group 1',
    items: [
      {
        label: 'item',
        href: '/item',
      },
      {
        label: 'item',
        href: '/item',
      },
      {
        label: 'item',
        href: '/item',
        blank: true,
      },
      {
        label: 'item',
        href: '/item',
        external: true,
      },
    ],
  },
];

/**
 * The global footer for the whole site.
 */
@Component
export class NsFooter extends Vue implements ThemeComponent {
  @Prop(String)
  public readonly theme?: Theme;
  public get themeValue(): Theme {
    return this.theme || this.$vd_theme.theme || 'lite';
  }

  public get classes(): ClassName {
    return [`nsp-theme_${this.themeValue}`];
  }

  private render(h: CreateElement): VNode {
    return (
      <div staticClass="ns-footer" class={this.classes} id="footer">
        <vd-container>
          <vd-flexbox gap>
            <vd-flexbox staticClass="ns-footer_label" flex={100}>
              Footer
            </vd-flexbox>

            {groups.map(group => (
              <vd-flexbox
                tag="ul"
                staticClass="ns-footer_group"
                flex="none"
                direction="column"
              >
                <vd-flexbox tag="li" staticClass="ns-footer_group-label">
                  {group.label}
                </vd-flexbox>
                {group.items.map(item => (
                  <vd-flexbox tag="li">
                    <a
                      staticClass="ns-footer_item"
                      href={item.href}
                      target={item.blank || item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer nofollow' : undefined}
                    >
                      {item.label}
                    </a>
                  </vd-flexbox>
                ))}
              </vd-flexbox>
            ))}
          </vd-flexbox>
        </vd-container>
      </div>
    );
  }
}

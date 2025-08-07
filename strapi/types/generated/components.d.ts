import type { Schema, Struct } from '@strapi/strapi';

export interface CmsAccordion extends Struct.ComponentSchema {
  collectionName: 'components_cms_accordions';
  info: {
    description: '';
    displayName: 'Accordion';
  };
  attributes: {
    accordion: Schema.Attribute.Component<'items.accordion-items', true>;
  };
}

export interface CmsButton extends Struct.ComponentSchema {
  collectionName: 'components_cms_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    blank: Schema.Attribute.Boolean;
    to: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface CmsContent extends Struct.ComponentSchema {
  collectionName: 'components_cms_contents';
  info: {
    description: '';
    displayName: 'Content';
  };
  attributes: {
    wysiwyg: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'default';
        }
      >;
  };
}

export interface CmsContentImage extends Struct.ComponentSchema {
  collectionName: 'components_cms_content_images';
  info: {
    description: '';
    displayName: 'ContentImage';
  };
  attributes: {
    button: Schema.Attribute.Component<'cms.button', false>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    revert: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    wysiwyg: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'default';
        }
      >;
  };
}

export interface CmsImage extends Struct.ComponentSchema {
  collectionName: 'components_cms_images';
  info: {
    description: '';
    displayName: 'Image';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface CmsPostList extends Struct.ComponentSchema {
  collectionName: 'components_cms_post_lists';
  info: {
    description: '';
    displayName: 'Post List';
  };
  attributes: {
    headline: Schema.Attribute.String;
  };
}

export interface CmsSpace extends Struct.ComponentSchema {
  collectionName: 'components_cms_spaces';
  info: {
    description: '';
    displayName: 'Space';
  };
  attributes: {
    margin: Schema.Attribute.Enumeration<
      ['mt-5', 'mt-10', 'mt-15', 'mt-20', 'mt-30']
    >;
  };
}

export interface CmsTable extends Struct.ComponentSchema {
  collectionName: 'components_cms_tables';
  info: {
    description: 'Einfache Tabelle mit CSV-Eingabe';
    displayName: 'Table';
    icon: 'table';
  };
  attributes: {
    csv: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ItemsAccordionItems extends Struct.ComponentSchema {
  collectionName: 'components_items_accordion_items';
  info: {
    description: '';
    displayName: 'Accordion-items';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'default';
        }
      >;
    title: Schema.Attribute.String;
  };
}

export interface ItemsNavItems extends Struct.ComponentSchema {
  collectionName: 'components_items_nav_items';
  info: {
    description: '';
    displayName: 'Nav-items';
    icon: 'apps';
  };
  attributes: {
    children: Schema.Attribute.Component<'items.subnavigation', true>;
    cta: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    icon: Schema.Attribute.String;
    invisible: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
    url: Schema.Attribute.String & Schema.Attribute.Unique;
  };
}

export interface ItemsNavItemsChildren extends Struct.ComponentSchema {
  collectionName: 'components_items_nav_items_children';
  info: {
    description: '';
    displayName: 'Nav-items-children';
  };
  attributes: {
    icon: Schema.Attribute.String;
    invisible: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
    url: Schema.Attribute.String;
  };
}

export interface ItemsPostTag extends Struct.ComponentSchema {
  collectionName: 'components_items_post_tags';
  info: {
    description: '';
    displayName: 'post-tag';
  };
  attributes: {
    tag: Schema.Attribute.Enumeration<
      [
        'UX /UI-Design',
        'UI-Design',
        'UX-Design',
        'Frontend',
        'Full Stack',
        'UX /UI-Design & Prototype',
        'UI-Design & Prototype',
        'CEO',
        'Full-Cycle-Design & Full-Stack Development',
      ]
    >;
  };
}

export interface ItemsSubnavigation extends Struct.ComponentSchema {
  collectionName: 'components_items_subnavigations';
  info: {
    description: '';
    displayName: 'Subnavigation';
  };
  attributes: {
    category: Schema.Attribute.String;
    sub: Schema.Attribute.Component<'items.nav-items-children', true>;
  };
}

export interface MetaMeta extends Struct.ComponentSchema {
  collectionName: 'components_meta_metas';
  info: {
    description: '';
    displayName: 'meta';
  };
  attributes: {
    description: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'cms.accordion': CmsAccordion;
      'cms.button': CmsButton;
      'cms.content': CmsContent;
      'cms.content-image': CmsContentImage;
      'cms.image': CmsImage;
      'cms.post-list': CmsPostList;
      'cms.space': CmsSpace;
      'cms.table': CmsTable;
      'items.accordion-items': ItemsAccordionItems;
      'items.nav-items': ItemsNavItems;
      'items.nav-items-children': ItemsNavItemsChildren;
      'items.post-tag': ItemsPostTag;
      'items.subnavigation': ItemsSubnavigation;
      'meta.meta': MetaMeta;
    }
  }
}

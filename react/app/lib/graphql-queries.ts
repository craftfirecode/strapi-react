import { gql } from "@apollo/client";

export const META_FRAGMENT = gql`
  fragment Meta on ComponentMetaMeta {
    title
    description
  }
`;

export const IMAGE_FRAGMENT = gql`
  fragment Image on UploadFile {
    documentId
    url
    alternativeText
    width
    height
    mime
  }
`;

export const BUTTON_FRAGMENT = gql`
  fragment Button on ComponentCmsButton {
    to
    value
    blank
  }
`;

export const CONTENT_FRAGMENT = gql`
  fragment Content on ComponentCmsContent {
    wysiwyg
  }
`;

export const IMAGE_COMPONENT_FRAGMENT = gql`
  fragment ImageComponent on ComponentCmsImage {
    image {
      ...Image
    }
  }
  ${IMAGE_FRAGMENT}
`;

export const SPACE_FRAGMENT = gql`
  fragment Space on ComponentCmsSpace {
    margin
  }
`;

export const POST_LIST_FRAGMENT = gql`
  fragment PostList on ComponentCmsPostList {
    headline
  }
`;

export const CONTENT_IMAGE_FRAGMENT = gql`
  fragment ContentImage on ComponentCmsContentImage {
    contentImage: image {
      ...Image
    }
    revert
    button {
      ...Button
    }
    wysiwyg
  }
  ${IMAGE_FRAGMENT}
  ${BUTTON_FRAGMENT}
`;

export const ACCORDION_ITEM_FRAGMENT = gql`
  fragment AccordionItem on ComponentItemsAccordionItems {
    title
    description
  }
`;

export const ACCORDION_FRAGMENT = gql`
  fragment Accordion on ComponentCmsAccordion {
    accordion {
      ...AccordionItem
    }
  }
  ${ACCORDION_ITEM_FRAGMENT}
`;

export const TABLE_FRAGMENT = gql`
  fragment Table on ComponentCmsTable {
    csv
  }
`;

export const YOUTUBE_FRAGMENT = gql`
  fragment YouTube on ComponentCmsYouTube {
    videoID
  }
`;

export const ZONE_FRAGMENTS = gql`
  fragment ZoneParts on PageZoneDynamicZone {
    __typename
    ... on ComponentCmsContent {
      ...Content
    }
    ... on ComponentCmsImage {
      ...ImageComponent
    }
    ... on ComponentCmsButton {
      ...Button
    }
    ... on ComponentCmsSpace {
      ...Space
    }
    ... on ComponentCmsPostList {
      ...PostList
    }
    ... on ComponentCmsContentImage {
      ...ContentImage
    }
    ... on ComponentCmsAccordion {
      ...Accordion
    }
    ... on ComponentCmsTable {
      ...Table
    }
    ... on ComponentCmsYouTube {
      ...YouTube
    }
  }
  ${CONTENT_FRAGMENT}
  ${IMAGE_COMPONENT_FRAGMENT}
  ${BUTTON_FRAGMENT}
  ${SPACE_FRAGMENT}
  ${POST_LIST_FRAGMENT}
  ${CONTENT_IMAGE_FRAGMENT}
  ${ACCORDION_FRAGMENT}
  ${TABLE_FRAGMENT}
  ${YOUTUBE_FRAGMENT}
`;

// Note: The union type name for dynamic zones might differ per content type (e.g. BlogZoneDynamicZone)
// So we might need specific fragments or just inline them in the query.

export const GET_PAGE = gql`
  query GetPage($documentId: ID!) {
    page(documentId: $documentId) {
      documentId
      settings {
        ...Meta
      }
      zone {
        __typename
        ... on ComponentCmsContent {
          ...Content
        }
        ... on ComponentCmsImage {
          ...ImageComponent
        }
        ... on ComponentCmsButton {
          ...Button
        }
        ... on ComponentCmsSpace {
          ...Space
        }
        ... on ComponentCmsPostList {
          ...PostList
        }
        ... on ComponentCmsContentImage {
          ...ContentImage
        }
        ... on ComponentCmsAccordion {
          ...Accordion
        }
        ... on ComponentCmsTable {
          ...Table
        }
        ... on ComponentCmsYouTube {
          ...YouTube
        }
      }
    }
  }
  ${META_FRAGMENT}
  ${CONTENT_FRAGMENT}
  ${IMAGE_COMPONENT_FRAGMENT}
  ${BUTTON_FRAGMENT}
  ${SPACE_FRAGMENT}
  ${POST_LIST_FRAGMENT}
  ${CONTENT_IMAGE_FRAGMENT}
  ${ACCORDION_FRAGMENT}
  ${TABLE_FRAGMENT}
  ${YOUTUBE_FRAGMENT}
`;

export const POST_TAG_FRAGMENT = gql`
  fragment PostTag on ComponentItemsPostTag {
    tag
  }
`;

export const GET_PAGES = gql`
  query GetPages($filters: PageFiltersInput) {
    pages(filters: $filters) {
      documentId
      settings {
        ...Meta
      }
      zone {
        __typename
        ... on ComponentCmsContent {
          ...Content
        }
        ... on ComponentCmsImage {
          ...ImageComponent
        }
        ... on ComponentCmsButton {
          ...Button
        }
        ... on ComponentCmsSpace {
          ...Space
        }
        ... on ComponentCmsPostList {
          ...PostList
        }
        ... on ComponentCmsContentImage {
          ...ContentImage
        }
        ... on ComponentCmsAccordion {
          ...Accordion
        }
        ... on ComponentCmsTable {
          ...Table
        }
        ... on ComponentCmsYouTube {
          ...YouTube
        }
      }
    }
  }
  ${META_FRAGMENT}
  ${CONTENT_FRAGMENT}
  ${IMAGE_COMPONENT_FRAGMENT}
  ${BUTTON_FRAGMENT}
  ${SPACE_FRAGMENT}
  ${POST_LIST_FRAGMENT}
  ${CONTENT_IMAGE_FRAGMENT}
  ${ACCORDION_FRAGMENT}
  ${TABLE_FRAGMENT}
  ${YOUTUBE_FRAGMENT}
`;

export const GET_BLOGS = gql`
  query GetBlogs($filters: BlogFiltersInput) {
    blogs(filters: $filters) {
      documentId
      url
      thumbnail {
        ...Image
      }
      settings {
        ...Meta
      }
      tag {
        ...PostTag
      }
      zone {
        __typename
        ... on ComponentCmsContent {
          ...Content
        }
        ... on ComponentCmsImage {
          ...ImageComponent
        }
        ... on ComponentCmsButton {
          ...Button
        }
        ... on ComponentCmsSpace {
          ...Space
        }
        ... on ComponentCmsPostList {
          ...PostList
        }
        ... on ComponentCmsContentImage {
          ...ContentImage
        }
        ... on ComponentCmsAccordion {
          ...Accordion
        }
        ... on ComponentCmsYouTube {
          ...YouTube
        }
      }
    }
  }
  ${META_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${CONTENT_FRAGMENT}
  ${IMAGE_COMPONENT_FRAGMENT}
  ${BUTTON_FRAGMENT}
  ${SPACE_FRAGMENT}
  ${POST_LIST_FRAGMENT}
  ${CONTENT_IMAGE_FRAGMENT}
  ${ACCORDION_FRAGMENT}
  ${YOUTUBE_FRAGMENT}
  ${POST_TAG_FRAGMENT}
`;

export const GET_POSTS = gql`
  query GetPosts($filters: PostFiltersInput) {
    posts(filters: $filters) {
      documentId
      url
      title
      description
      thumbnail {
        ...Image
      }
      settings {
        ...Meta
      }
      tag {
        ...PostTag
      }
      zone {
        __typename
        ... on ComponentCmsContent {
          ...Content
        }
        ... on ComponentCmsImage {
          ...ImageComponent
        }
        ... on ComponentCmsButton {
          ...Button
        }
        ... on ComponentCmsSpace {
          ...Space
        }
        ... on ComponentCmsPostList {
          ...PostList
        }
        ... on ComponentCmsContentImage {
          ...ContentImage
        }
        ... on ComponentCmsAccordion {
          ...Accordion
        }
      }
    }
  }
  ${META_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${CONTENT_FRAGMENT}
  ${IMAGE_COMPONENT_FRAGMENT}
  ${BUTTON_FRAGMENT}
  ${SPACE_FRAGMENT}
  ${POST_LIST_FRAGMENT}
  ${CONTENT_IMAGE_FRAGMENT}
  ${ACCORDION_FRAGMENT}
  ${POST_TAG_FRAGMENT}
`;

export const GET_NAVIGATION = gql`
  query GetNavigation {
    navigation {
      documentId
      top {
        label
        icon
        url
        invisible
        page {
          documentId
        }
        cta {
          ...Image
        }
        children {
          category
          sub {
            label
            icon
            url
            subtext
            invisible
            page {
              documentId
            }
          }
        }
      }
      index {
        documentId
      }
      datenschutz {
        documentId
      }
      impressum {
        documentId
      }
    }
  }
  ${IMAGE_FRAGMENT}
`;

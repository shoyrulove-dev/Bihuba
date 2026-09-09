export type FieldType =
  | "text" | "password" | "textarea" | "select" | "date" | "checkbox" | "url" | "richtext"
  | "image" | "file" | "stats" | "nav" | "contact" | "social" | "links" | "permissions"
  | "supporters" | "banners" | "products" | "theme" | "ai";

export type FieldConfig = {
  name: string;
  label: string;
  type?: FieldType;
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
  helpText?: string;
  section?: string;
  fullWidth?: boolean;
};

export type CollectionManagerProps = {
  collection: string;
  title: string;
  description: string;
  fields: FieldConfig[];
  initialItems: Record<string, unknown>[];
  filterField?: string;
  filterOptions?: Array<{ label: string; value: string }>;
  singleton?: boolean;
  allowDelete?: boolean;
  hideSingletonEditButton?: boolean;
  closeHref?: string;
  panelMaxWidthClass?: string;
  defaultSectionsOpen?: boolean;
  serverPagination?: { page: number; pageSize: number; totalItems: number; query?: string; filter?: string };
};

export type StatItem = { label: string; value: string };
export type NavItem = { label: string; href: string };
export type ContactItem = { address: string; phone: string; email: string; website?: string; officeImageUrl?: string; googleMapUrl?: string };
export type FormState = Record<string, unknown>;
export type FieldSection = { title: string; fields: FieldConfig[] };

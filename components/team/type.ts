export interface FrontMatter {
    title?: string;
    description?: string;
    author?: string;
    keywords?: string;
    image?: string;
    role?: string;
    category?: string; // Students, Interns
    date?: string;
    twitter?: string;
    github?: string;
    linkedin?: string;
    scholar_google?: string;
    orcid?: string;
    range?: string;
    current_position?: string;
}

export interface Page {
    name: string;
    route: string;
    children?: Page[];
    meta?: Record<string, any>;
    frontMatter?: FrontMatter;
}
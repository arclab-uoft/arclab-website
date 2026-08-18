export default {
  "*": {
    type: "page",
    theme: {
      sidebar: false,
      toc: false,
      breadcrumb: false,
      timestamp: false,
      pagination: false,
      layout: "default"
    }
  },

  index: {
    title: "Home",
    type: "page",
    theme: {
      layout: "raw"
    }
  },

  team: {
    title: "Team",
    type: "page",
    theme: {
      layout: "default"
    }
  },

  position: {
    title: "Open Positions",
    type: "page",
    display: "hidden"
  },

  projects: {
    title: "Projects",
    type: "page",
    theme: {
      layout: "default"
    }
  },

  publication: {
    title: "Publications",
    type: "page"
  },

  events: {
    title: "Events",
    type: "page",
    display: "hidden"
  },

  contact: {
    title: "Contact",
    type: "page"
  }
}
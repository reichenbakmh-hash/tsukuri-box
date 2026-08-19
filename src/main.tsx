import { StrictMode, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";

import {
  Search,
  SlidersHorizontal,
  Github,
  ExternalLink,
  Copy,
  Check,
  X,
  Code2,
  Layers3,
  Star,
  Keyboard,
  FolderGit2,
  Plus,
  Tag
} from "lucide-react";

import { templates, type Template } from "./data/templates";

import "./styles.css";

const categories = [
  "Tous",
  "Landing Page",
  "Dashboard",
  "Portfolio",
  "Starter"
];

function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tous");
  const [selectedTemplate, setSelectedTemplate] =
    useState<Template | null>(null);

  const [showAddPanel, setShowAddPanel] = useState(false);

  const [copied, setCopied] = useState(false);

  const filteredTemplates = useMemo(() => {
    const search = query.trim().toLowerCase();

    return templates.filter((template) => {
      const categoryMatch =
        category === "Tous" ||
        template.category === category;

      const searchableContent = [
        template.title,
        template.description,
        template.category,
        ...template.tags
      ]
        .join(" ")
        .toLowerCase();

      const searchMatch =
        search.length === 0 ||
        searchableContent.includes(search);

      return categoryMatch && searchMatch;
    });
  }, [query, category]);

  const totalTags = useMemo(() => {
    return new Set(
      templates.flatMap((template) => template.tags)
    ).size;
  }, []);

  async function copyGithubUrl(url: string) {
    try {
      await navigator.clipboard.writeText(url);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="app-shell">

      <header className="topbar">

        <div className="brand">

          <div className="brand-mark">
            <span>&lt;01&gt;</span>
          </div>

          <div>
            <div className="brand-name">
              Tsukuri.Box
            </div>

            <div className="brand-status">
              <span className="status-dot" />
              library online
            </div>
          </div>

        </div>

        <div className="top-actions">

          <button
            className="icon-button"
            type="button"
            aria-label="Raccourcis"
            title="Raccourcis"
          >
            <Keyboard size={17} />
          </button>

          <button
            className="add-button"
            type="button"
            onClick={() => setShowAddPanel(true)}
          >
            <Plus size={16} />
            Ajouter
          </button>

        </div>

      </header>

      <main className="workspace">

        <aside className="sidebar">

          <div className="sidebar-label">
            WORKSPACE
          </div>

          <button
            type="button"
            className="sidebar-item active"
          >
            <Layers3 size={16} />
            <span>Templates</span>

            <small>
              {templates.length}
            </small>
          </button>

          <button
            type="button"
            className="sidebar-item"
          >
            <FolderGit2 size={16} />
            <span>GitHub source</span>
          </button>

          <button
            type="button"
            className="sidebar-item"
          >
            <Star size={16} />
            <span>Favoris</span>
          </button>

          <div className="sidebar-label category-label">
            CATEGORIES
          </div>

          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={`category-item ${
                category === item ? "active" : ""
              }`}
              onClick={() => setCategory(item)}
            >
              <span className="category-marker" />
              {item}
            </button>
          ))}

          <div className="sidebar-bottom">

            <div className="system-box">

              <div className="system-row">
                <span>storage</span>
                <strong>GitHub</strong>
              </div>

              <div className="system-row">
                <span>database</span>
                <strong>none</strong>
              </div>

              <div className="system-row">
                <span>offline</span>
                <strong>ready</strong>
              </div>

            </div>

          </div>

        </aside>

        <section className="content">

          <div className="content-header">

            <div>

              <div className="breadcrumb">
                <span>workspace</span>
                <span>/</span>
                <strong>templates</strong>
              </div>

              <h1>
                Template Library
              </h1>

              <p>
                Ton petit arsenal de starters prêts à dégainer.
              </p>

            </div>

            <div className="statistics">

              <div>
                <strong>
                  {templates.length}
                </strong>

                <span>
                  entries
                </span>
              </div>

              <div>
                <strong>
                  {totalTags}
                </strong>

                <span>
                  stacks
                </span>
              </div>

            </div>

          </div>

          <div className="toolbar">

            <div className="search-box">

              <Search size={18} />

              <input
                type="search"
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder="Rechercher un template, une stack, un tag..."
                aria-label="Rechercher un template"
              />

              <kbd>
                ⌘ K
              </kbd>

            </div>

            <button
              type="button"
              className="filter-button"
            >
              <SlidersHorizontal size={16} />
              <span>Filtres</span>
            </button>

          </div>

          <div className="active-filters">

            <span className="result-count">
              {filteredTemplates.length} résultat
              {filteredTemplates.length > 1 ? "s" : ""}
            </span>

            {category !== "Tous" && (
              <button
                type="button"
                className="filter-chip"
                onClick={() => setCategory("Tous")}
              >
                {category}
                <X size={13} />
              </button>
            )}

          </div>

          <div className="template-grid">

            {filteredTemplates.map(
              (template, index) => (
                <article
                  key={template.id}
                  className={`template-card ${
                    template.featured
                      ? "featured"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedTemplate(template)
                  }
                >

                  <div className="card-preview">

                    <div className="preview-header">

                      <span className="window-dot red" />
                      <span className="window-dot yellow" />
                      <span className="window-dot green" />

                      <span className="preview-path">
                        ~/templates/
                        {template.id}
                      </span>

                      {template.featured && (
                        <span className="featured-badge">
                          featured
                        </span>
                      )}

                    </div>

                    <div className="preview-code">

                      <span className="code-line muted">
                        &lt;
                        <span>div</span>{" "}
                        className=
                        <em>"app"</em>
                        &gt;
                      </span>

                      <span className="code-line indent">
                        const{" "}
                        <b>
                          {template.title
                            .replace(/\s+/g, "")
                            .slice(0, 12)}
                        </b>{" "}
                        ={" "}
                        <i>
                          "ready"
                        </i>
                        ;
                      </span>

                      <span className="code-line indent">
                        &lt;
                        <span>UI</span>{" "}
                        <em>speed</em>=
                        <i>"fast"</i>{" "}
                        /&gt;
                      </span>

                      <span className="code-line muted">
                        &lt;/
                        <span>div</span>
                        &gt;
                      </span>

                    </div>

                    <div className="preview-status">

                      <span>●</span>

                      preview stable

                      <span className="branch">
                        main
                      </span>

                    </div>

                  </div>

                  <div className="card-body">

                    <div className="card-kicker">
                      {String(index + 1).padStart(2, "0")}
                      {" · "}
                      {template.category}
                    </div>

                    <h2>
                      {template.title}
                    </h2>

                    <p>
                      {template.description}
                    </p>

                    <div className="tag-row">

                      {template.tags
                        .slice(0, 4)
                        .map((tag) => (
                          <span key={tag}>
                            {tag}
                          </span>
                        ))}

                    </div>

                    <div className="card-footer">

                      <span>
                        {template.license ??
                          "License à vérifier"}
                      </span>

                      <span className="open-label">
                        ouvrir
                        <ExternalLink size={14} />
                      </span>

                    </div>

                  </div>

                </article>
              )
            )}

          </div>

          {filteredTemplates.length === 0 && (
            <div className="empty-state">

              <Code2 size={28} />

              <h3>
                Aucun template trouvé
              </h3>

              <p>
                Essaie une autre stack ou un autre tag.
              </p>

            </div>
          )}

        </section>

      </main>

      <footer className="status-bar">

        <div>
          <span className="status-green" />
          TSUKURI.BOX
        </div>

        <div className="status-center">
          0 warnings · 0 databases · github-backed
        </div>

        <div className="status-right">
          <span>UTF-8</span>
          <span>React</span>
          <span>Vite</span>
        </div>

      </footer>

      {selectedTemplate && (
        <div
          className="modal-layer"
          onClick={() => setSelectedTemplate(null)}
        >

          <div
            className="detail-panel"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              type="button"
              className="close-button"
              onClick={() =>
                setSelectedTemplate(null)
              }
              aria-label="Fermer"
            >
              <X size={18} />
            </button>

            <div className="detail-header">

              <div className="detail-icon">
                <Code2 size={22} />
              </div>

              <div>

                <span>
                  {selectedTemplate.category}
                </span>

                <h2>
                  {selectedTemplate.title}
                </h2>

              </div>

            </div>

            <p className="detail-description">
              {selectedTemplate.description}
            </p>

            <div className="detail-code">

              <div>
                <span className="syntax-key">
                  const
                </span>{" "}
                template = {"{"}
              </div>

              <div className="indent">
                <span className="syntax-key">
                  title:
                </span>{" "}
                <span className="syntax-string">
                  "{selectedTemplate.title}"
                </span>
                ,
              </div>

              <div className="indent">
                <span className="syntax-key">
                  description:
                </span>{" "}
                <span className="syntax-string">
                  "{selectedTemplate.description}"
                </span>
                ,
              </div>

              <div className="indent">
                <span className="syntax-key">
                  category:
                </span>{" "}
                <span className="syntax-string">
                  "{selectedTemplate.category}"
                </span>
                ,
              </div>

              <div className="indent">
                <span className="syntax-key">
                  tags:
                </span>{" "}
                [
                {selectedTemplate.tags.map(
                  (tag, tagIndex) => (
                    <span
                      className="syntax-string"
                      key={tag}
                    >
                      "{tag}"
                      {tagIndex <
                      selectedTemplate.tags.length -
                        1
                        ? ", "
                        : ""}
                    </span>
                  )
                )}
                ],
              </div>

              <div className="indent">
                <span className="syntax-key">
                  github:
                </span>{" "}
                <span className="syntax-string">
                  "{selectedTemplate.github}"
                </span>
              </div>

              <div>
                {"}"}
              </div>

            </div>

            <div className="detail-tags">

              {selectedTemplate.tags.map(
                (tag) => (
                  <span key={tag}>
                    <Tag size={12} />
                    {tag}
                  </span>
                )
              )}

            </div>

            <div className="detail-actions">

              <a
                className="primary-action"
                href={selectedTemplate.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={17} />
                GitHub
              </a>

              {selectedTemplate.demo && (
                <a
                  className="secondary-action"
                  href={selectedTemplate.demo}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink size={16} />
                  Demo
                </a>
              )}

              <button
                type="button"
                className="secondary-action"
                onClick={() =>
                  copyGithubUrl(
                    selectedTemplate.github
                  )
                }
              >
                {copied ? (
                  <Check size={16} />
                ) : (
                  <Copy size={16} />
                )}

                {copied
                  ? "Copié"
                  : "Copier URL"}
              </button>

            </div>

          </div>

        </div>
      )}

      {showAddPanel && (
        <div
          className="modal-layer"
          onClick={() => setShowAddPanel(false)}
        >

          <div
            className="detail-panel"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              type="button"
              className="close-button"
              onClick={() =>
                setShowAddPanel(false)
              }
              aria-label="Fermer"
            >
              <X size={18} />
            </button>

            <div className="detail-header">

              <div className="detail-icon">
                <FolderGit2 size={22} />
              </div>

              <div>

                <span>
                  github-backed
                </span>

                <h2>
                  Ajouter un template
                </h2>

              </div>

            </div>

            <p className="detail-description">
              Ajoute simplement une nouvelle entrée
              dans{" "}
              <code>
                src/data/templates.ts
              </code>
              , puis commit et push sur GitHub.
              Tsukuri.Box n'a besoin d'aucune base
              de données pour conserver ton catalogue.
            </p>

            <div className="detail-code">

              <div>
                <span className="syntax-comment">
                  // un objet = un template
                </span>
              </div>

              <div>
                {"{"}
              </div>

              <div className="indent">
                <span className="syntax-key">
                  id:
                </span>{" "}
                <span className="syntax-string">
                  "mon-template"
                </span>
                ,
              </div>

              <div className="indent">
                <span className="syntax-key">
                  title:
                </span>{" "}
                <span className="syntax-string">
                  "Mon template"
                </span>
                ,
              </div>

              <div className="indent">
                <span className="syntax-key">
                  description:
                </span>{" "}
                <span className="syntax-string">
                  "Description..."
                </span>
                ,
              </div>

              <div className="indent">
                <span className="syntax-key">
                  category:
                </span>{" "}
                <span className="syntax-string">
                  "Landing Page"
                </span>
                ,
              </div>

              <div className="indent">
                <span className="syntax-key">
                  tags:
                </span>{" "}
                [
                <span className="syntax-string">
                  "React"
                </span>
                ,
                <span className="syntax-string">
                  "Vite"
                </span>
                ],
              </div>

              <div className="indent">
                <span className="syntax-key">
                  github:
                </span>{" "}
                <span className="syntax-string">
                  "https://github.com/..."
                </span>
              </div>

              <div>
                {"}"}
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <StrictMode>
    <App />
  </StrictMode>
);

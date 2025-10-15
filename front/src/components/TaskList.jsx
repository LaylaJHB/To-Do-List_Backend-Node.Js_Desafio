
import React, { useMemo } from "react";
import { useEffect, useState, useMemo as useMemo2 } from "react"; // alias to avoid confusion above
import styled from "styled-components";
import api from "../services/api";


const uiToApiStatus = (s) => {
  const map = { PENDING: "pendente", IN_PROGRESS: "em_andamento", DONE: "concluida" };
  return map[s] || "";
};

const apiToUiStatus = (s) => {
  const v = String(s || "").toLowerCase();
  if (v === "pendente") return "PENDING";
  if (v === "em_andamento") return "IN_PROGRESS";
  if (v === "concluida") return "DONE";
  return "PENDING";
};

/**
 * TaskList.jsx — Layout only
 *
 * Drop-in layout component for your Task List page.
 * It does **not** fetch data; pass data via props or plug your hooks.
 *
 * Props (all optional for now):
 * - tasks: Array<{ id, title, description, status, priority, deadline, createdAt, assignee }>
 * - loading: boolean
 * - page: number (1-based)
 * - pageCount: number
 * - onCreate: () => void
 * - onEdit: (task) => void
 * - onDelete: (id) => void
 * - onToggleComplete: (id) => void
 * - onSearch: (text) => void
 * - onFilter: (status) => void
 * - onSort: (sortKey) => void  // "deadline" | "createdAt" | "priority" | "title"
 * - onPageChange: (page) => void
 *
 * Styling: basic inline styles + classNames for easy override.
 * Replace inline styles with your own CSS or Tailwind classes later.
 */

const StatusBadge = ({ status }) => {
  const map = {
    PENDING: { bg: "#FFF4E5", fg: "#9A6700", label: "Pendente" },
    IN_PROGRESS: { bg: "#E7F5FF", fg: "#095C92", label: "Em andamento" },
    DONE: { bg: "#EAFBF0", fg: "#116B43", label: "Concluída" },
  };
  const cfg = map[status] || { bg: "#F1F1F1", fg: "#555", label: status };
  return (
    <span
      className="status-badge"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        background: cfg.bg,
        color: cfg.fg,
        letterSpacing: 0.2,
      }}
      aria-label={`Status: ${cfg.label}`}
    >
      <span
        aria-hidden
        style={{
          width: 6,
          height: 6,
          borderRadius: 999,
          background: cfg.fg,
          display: "inline-block",
        }}
      />
      {cfg.label}
    </span>
  );
};

const PriorityDot = ({ priority }) => {
  const color = priority === "HIGH" ? "#D92D20" : priority === "MEDIUM" ? "#F59E0B" : "#15803D";
  const label = priority === "HIGH" ? "Alta" : priority === "MEDIUM" ? "Média" : "Baixa";
  return (
    <div title={`Prioridade: ${label}`} style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span aria-hidden style={{ width: 10, height: 10, borderRadius: 999, background: color }} />
      <span style={{ fontSize: 12, color: "#475467" }}>{label}</span>
    </div>
  );
};

const EmptyState = ({ onCreate }) => (
  <div
    className="empty-state"
    style={{
      border: "1px dashed #CBD5E1",
      borderRadius: 16,
      padding: 32,
      textAlign: "center",
      background: "#FCFCFD",
    }}
    role="region"
    aria-label="Nenhuma tarefa encontrada"
  >
    <div style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>Sem tarefas por aqui</div>
    <div style={{ color: "#475467", marginBottom: 16 }}>
      Crie sua primeira tarefa ou ajuste os filtros para ver resultados.
    </div>
    <button
      onClick={onCreate}
      style={primaryBtn}
      className="btn btn-primary"
    >
      + Nova tarefa
    </button>
  </div>
);

const SkeletonRow = () => (
  <tr>
    {[...Array(6)].map((_, i) => (
      <td key={i} style={{ padding: "14px 16px" }}>
        <div className="skeleton" style={{ height: 12, borderRadius: 8, background: "#EEF2F6" }} />
      </td>
    ))}
  </tr>
);

const Toolbar = ({ onCreate, onSearch, onFilter, onSort }) => {
  return (
    <div
      className="toolbar"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto auto auto",
        gap: 12,
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative" }}>
        <input
          aria-label="Buscar por título"
          placeholder="Buscar por título..."
          onChange={(e) => onSearch && onSearch(e.target.value)}
          style={inputStyle}
        />
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          width="18"
          height="18"
          style={{ position: "absolute", right: 12, top: 10, opacity: 0.6 }}
        >
          <path
            d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
            fill="none"
            stroke="#64748B"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <select aria-label="Filtrar por status" defaultValue="" onChange={(e) => onFilter && onFilter(e.target.value)} style={selectStyle}>
        <option value="">Status: Todos</option>
        <option value="PENDING">Pendente</option>
        <option value="IN_PROGRESS">Em andamento</option>
        <option value="DONE">Concluída</option>
      </select>

      <select aria-label="Ordenar" defaultValue="deadline" onChange={(e) => onSort && onSort(e.target.value)} style={selectStyle}>
        <option value="deadline">Ordenar: Deadline</option>
        <option value="createdAt">Criadas recentemente</option>
        <option value="priority">Prioridade</option>
        <option value="title">Título (A→Z)</option>
      </select>

      <button onClick={onCreate} style={primaryBtn} className="btn btn-primary" aria-label="Criar nova tarefa">
        + Nova tarefa
      </button>
    </div>
  );
};

export function TaskListView({
  tasks = [],
  loading = false,
  page = 1,
  pageCount = 1,
  onCreate,
  onEdit,
  onDelete,
  onToggleComplete,
  onSearch,
  onFilter,
  onSort,
  onPageChange,
}) {
  const showEmpty = !loading && (!tasks || tasks.length === 0);

  const header = useMemo(
    () => (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, color: "#0F172A" }}>Tarefas</h1>
          <p style={{ margin: "6px 0 0", color: "#64748B", fontSize: 14 }}>
            Visualize, filtre e gerencie suas tarefas.
          </p>
        </div>
      </div>
    ),
    []
  );

  return (
    <div className="tasklist-wrapper" style={container}>
      {header}

      <div style={{ height: 16 }} />
      <Toolbar onCreate={onCreate} onSearch={onSearch} onFilter={onFilter} onSort={onSort} />

      <div style={{ height: 16 }} />

      <div className="table-card" style={card} role="region" aria-label="Lista de tarefas">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
            <thead>
              <tr>
                {[
                  "Tarefa",
                  "Status",
                  "Prioridade",
                  "Deadline",
                  "Responsável",
                  "Ações",
                ].map((th) => (
                  <th
                    key={th}
                    scope="col"
                    style={{
                      textAlign: "left",
                      padding: "14px 16px",
                      fontSize: 12,
                      color: "#64748B",
                      fontWeight: 600,
                      borderBottom: "1px solid #EEF2F6",
                      background: "#F8FAFC",
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    {th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <>
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                </>
              )}

              {!loading && tasks &&
                tasks.map((t) => (
                  <tr key={t.id} className="row">
                    <td style={cellPrimary}>
                      <div style={{ display: "flex", alignItems: "start", gap: 12 }}>
                        <input
                          aria-label={`Marcar ${t.title} como concluída`}
                          type="checkbox"
                          checked={t.status === "DONE"}
                          onChange={() => onToggleComplete && onToggleComplete(t.id)}
                          style={{ width: 18, height: 18 }}
                        />
                        <div>
                          <div style={{ fontWeight: 600, color: "#0F172A" }}>{t.title}</div>
                          {t.description && (
                            <div style={{ color: "#64748B", fontSize: 13, marginTop: 2 }}>{t.description}</div>
                          )}
                        </div>
                      </div>
                    </td>

                    <td style={cell}>
                      <StatusBadge status={t.status} />
                    </td>

                    <td style={cell}>
                      <PriorityDot priority={t.priority} />
                    </td>

                    <td style={cell}>
                      <time dateTime={t.deadline} style={{ color: "#334155" }}>
                        {formatDate(t.deadline)}
                      </time>
                    </td>

                    <td style={cell}>
                      <div style={{ color: "#475467" }}>{t.assignee || "—"}</div>
                    </td>

                    <td style={{ ...cell, minWidth: 160 }}>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <button className="btn btn-ghost" style={ghostBtn} onClick={() => onEdit && onEdit(t)}>
                          Editar
                        </button>
                        <button
                          className="btn btn-danger"
                          style={dangerBtn}
                          onClick={() => onDelete && onDelete(t.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {showEmpty && (
          <div style={{ padding: 24 }}>
            <EmptyState onCreate={onCreate} />
          </div>
        )}
      </div>

      <footer aria-label="Paginação" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
        <div style={{ color: "#64748B", fontSize: 13 }}>
          Página <strong>{page}</strong> de <strong>{pageCount}</strong>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            style={secondaryBtn}
            disabled={page <= 1}
            onClick={() => onPageChange && onPageChange(page - 1)}
          >
            Anterior
          </button>
          <button
            style={secondaryBtn}
            disabled={page >= pageCount}
            onClick={() => onPageChange && onPageChange(page + 1)}
          >
            Próxima
          </button>
        </div>
      </footer>
    </div>
  );
}

// ————————————————————————————————————————————————————————————————
// Container (data + actions) that plugs into TaskListView and reuses your API service
// Keeps your previous behavior (token from localStorage, GET /task/getAllPosts)


const LogoutButton = styled.button`
  margin-top: 16px;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  font-weight: 600;
  cursor: pointer;
`;

export default function TaskList({ onLogout }) {
  const [rawTasks, setRawTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI state (client-side search/filter/sort/pagination)
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState(""); // "PENDING" | "IN_PROGRESS" | "DONE" | ""
  const [sortKey, setSortKey] = useState("deadline");
  const [page, setPage] = useState(1);
  const pageSize = 10;

useEffect(() => {
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await api.get("/task/getAllPosts", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          title: query || undefined,
          status: status ? uiToApiStatus(status) : undefined,
          page
        }
      });

      // aceita tanto array puro quanto objeto { tasks: [...] } ou { result: [...] }
      const raw = Array.isArray(data) ? data : (data?.tasks || data?.result || data || []);
      const normalized = raw.map(t => ({
        id: t.id,
        title: t.title,
        description: t.description,
        deadline: t.deadline,       // já vem ISO? se vier 'YYYY-MM-DD', ok pro <time/>
        status: apiToUiStatus(t.status),
        createdAt: t.created_at || t.createdAt,
        assignee: t.authorId || t.assignee || ""
      }));

      setRawTasks(normalized);
    } catch (err) {
      console.error(err?.response?.data || err.message);
      alert("Falha ao buscar tarefas");
    } finally {
      setLoading(false);
    }
  };
  fetchTasks();
  // refaz o fetch quando filtro/ordem/página mudar no server
}, [query, status, page]);



  // Derived tasks (search/filter/sort + paginate)
  const filtered = useMemo2(() => {
    let list = [...rawTasks];

    if (query) {
      const q = query.toLowerCase();
      list = list.filter((t) => String(t.title || "").toLowerCase().includes(q));
    }
    if (status) {
      list = list.filter((t) => t.status === status);
    }

    list.sort((a, b) => {
      switch (sortKey) {
        case "createdAt":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case "priority": {
          const rank = { HIGH: 3, MEDIUM: 2, LOW: 1 };
          return (rank[b.priority] || 0) - (rank[a.priority] || 0);
        }
        case "title":
          return String(a.title || "").localeCompare(String(b.title || ""));
        case "deadline":
        default:
          return new Date(a.deadline || 0) - new Date(b.deadline || 0);
      }
    });

    return list;
  }, [rawTasks, query, status, sortKey]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageSafe = Math.min(page, pageCount);
  const paged = useMemo2(
    () => filtered.slice((pageSafe - 1) * pageSize, pageSafe * pageSize),
    [filtered, pageSafe]
  );

  // Wire callbacks expected by the view
  const onSearch = (text) => {
    setPage(1);
    setQuery(text);
  };
  const onFilter = (st) => {
    setPage(1);
    setStatus(st);
  };
  const onSort = (key) => setSortKey(key);
  const onPageChange = (p) => setPage(p);


const onCreate = async () => {
  const title = window.prompt("Título da tarefa:");
  if (!title) return;
  const description = window.prompt("Descrição (opcional):") || "";
  const deadline = window.prompt("Deadline (YYYY-MM-DD, opcional):") || "";
  const statusUI = "PENDING"; // default visual

  try {
    const token = localStorage.getItem("token");
    await api.post(
      "/task/create",
      {
        title,                    // ✅ chave correta
        description,
        deadline,
        status: uiToApiStatus(statusUI)
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("token localStorage:", localStorage.getItem("token"));


    // Refetch simples
    setPage(1);
    setQuery(q => q); // re-dispara o useEffect de fetch
  } catch (err) {
    console.error(err?.response?.data || err.message);
    alert(`Erro ao criar tarefa: ${err?.response?.data || err.message}`);
  }
};


  const onEdit = (task) => {
    // TODO: abrir modal/rota de edição usando task.id
    console.log("edit", task);
  };
  const onDelete = async (id) => {
    // TODO: chamar seu endpoint de delete e refazer fetch
    console.log("delete", id);
  };
  const onToggleComplete = async (id) => {
    // TODO: chamar endpoint para marcar como DONE/PENDING e refazer fetch
    console.log("toggle", id);
  };

  return (
    <div>
      <TaskListView
        tasks={paged}
        loading={loading}
        page={pageSafe}
        pageCount={pageCount}
        onCreate={onCreate}
        onEdit={onEdit}
        onDelete={onDelete}
        onToggleComplete={onToggleComplete}
        onSearch={onSearch}
        onFilter={onFilter}
        onSort={onSort}
        onPageChange={onPageChange}
      />

      <LogoutButton onClick={onLogout}>Sair</LogoutButton>
    </div>
  );
}

// UTIL —————————————————————————————————————————————————————————————— ——————————————————————————————————————————————————————————————
const formatDate = (iso) => {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(d);
  } catch {
    return iso;
  }
};

// STYLES — lightweight tokens to swap later
const container = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: 16,
};

const card = {
  border: "1px solid #E2E8F0",
  borderRadius: 16,
  background: "#FFFFFF",
  boxShadow: "0 1px 2px rgba(16, 24, 40, 0.04)",
};

const inputStyle = {
  width: "100%",
  height: 38,
  border: "1px solid #CBD5E1",
  borderRadius: 10,
  padding: "0 36px 0 12px",
  outline: "none",
};

const selectStyle = {
  height: 38,
  border: "1px solid #CBD5E1",
  borderRadius: 10,
  padding: "0 12px",
  background: "#fff",
};

const cell = { padding: "14px 16px", borderBottom: "1px solid #F1F5F9", verticalAlign: "middle" };
const cellPrimary = { ...cell, minWidth: 280 };

const baseBtn = {
  height: 36,
  padding: "0 12px",
  borderRadius: 10,
  border: "1px solid transparent",
  fontWeight: 600,
  cursor: "pointer",
};

const primaryBtn = {
  ...baseBtn,
  background: "#1D4ED8",
  color: "white",
  borderColor: "#1D4ED8",
};

const secondaryBtn = {
  ...baseBtn,
  background: "#F8FAFC",
  borderColor: "#E2E8F0",
  color: "#0F172A",
};

const ghostBtn = {
  ...baseBtn,
  background: "transparent",
  borderColor: "#E2E8F0",
  color: "#0F172A",
};

const dangerBtn = {
  ...baseBtn,
  background: "#FEE2E2",
  color: "#991B1B",
  borderColor: "#FEE2E2",
};



/*

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  margin-bottom: 5px;
`;

const LogoutButton = styled.button`
  margin-top: 20px;
  padding: 8px;
`;

function TaskList({ onLogout }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await api.get('/task/getAllPosts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(data);
      } catch (err) {
        console.error(err.response?.data || err.message);
        alert('Falha ao buscar tarefas');
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Minhas Tarefas</h2>
      <List>
        {tasks.map((t) => <Item key={t.id}>{t.title}</Item>)}
      </List>
      <LogoutButton onClick={onLogout}>Sair</LogoutButton>
    </div>
  );
}

export default TaskList;

*/
// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import api from '../services/api';

// const List = styled.ul`
//   list-style: none;
//   padding: 0;
// `;

// const ListItem = styled.li`
//   margin-bottom: 5px;
// `;

// function TaskList() {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await api.get('/tasks/getAllPosts', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setTasks(response.data);
//       } catch (error) {
//         alert('Erro ao buscar tarefas');
//       }
//     };

//     fetchTasks();
//   }, []);

//   return (
//     <div>
//       <h2>Minhas Tarefas</h2>
//       <List>
//         {tasks.map((task) => (
//           <ListItem key={task.id}>{task.title}</ListItem>
//         ))}
//       </List>
//     </div>
//   );
// }

// export default TaskList;

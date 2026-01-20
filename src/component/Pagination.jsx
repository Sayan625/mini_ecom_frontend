// component/Pagination.jsx
import { useDispatch, useSelector } from "react-redux";

export default function Pagination({ slice, setPageAction }) {
  const dispatch = useDispatch();

  const { page, totalPages } = useSelector(state => state[slice]);

  if (totalPages <= 1) return null;

  return (
    <nav className="d-flex justify-content-center">
      <ul className="pagination pagination-sm">

        <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => dispatch(setPageAction(page - 1))}
          >
            Prev
          </button>
        </li>

        {[...Array(totalPages)].map((_, i) => (
          <li
            key={i}
            className={`page-item ${page === i ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => dispatch(setPageAction(i))}
            >
              {i + 1}
            </button>
          </li>
        ))}

        <li className={`page-item ${page === totalPages - 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => dispatch(setPageAction(page + 1))}
          >
            Next
          </button>
        </li>

      </ul>
    </nav>
  );
}

import type { MouseEvent } from "react";

export default function CitationLink({
  id,
  position,
}: {
  id: string;
  position: number;
}) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({
      behavior: "smooth",
    });
  }
  return (
    <sup className="in-page-link">
      <a href={"#"} onClick={handleClick}>
        [{position}]
      </a>
    </sup>
  );
}

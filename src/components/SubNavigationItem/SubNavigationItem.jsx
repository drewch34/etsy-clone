function getId(label) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function SubNavigationItem({ label, icon, children }) {
  return (
    <li>
      <a href={`#${getId(label)}`}>
        {label}
        <span
          aria-hidden="true"
          {...(icon ? { className: "icon " + icon } : {})}
        ></span>
      </a>
      {children}
    </li>
  );
}

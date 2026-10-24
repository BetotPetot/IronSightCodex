
function CollectionStats({ collections }) {
  const totalCollections = collections.length;

  const totalCategories = new Set(
    collections.map((item) => item.category)
  ).size;

  const totalOrigins = new Set(
    collections.map((item) => item.origin)
  ).size;

  const stats = [
    {
      label: 'TOTAL COLLECTIONS',
      value: totalCollections,
    },
    {
      label: 'CATEGORIES',
      value: totalCategories,
    },
    {
      label: 'COUNTRIES OF ORIGIN',
      value: totalOrigins,
    },
  ];

  return (
    <section className="stats-grid">
      {stats.map((stat) => (
        <article className="stat-card" key={stat.label}>
          <span>{stat.label}</span>
          <h3>{stat.value}</h3>
        </article>
      ))}
    </section>
  );
}

export default CollectionStats;

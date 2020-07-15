export default [
  {
    title: 'Главная', link: 'cardpage.html', child: [], icon: 'home',
  },
  {
    title: 'Мини-игры',
    link: '#pageSubmenu',
    child: [
      { title: 'SpeakIt', link: 'speakit.html' },
      { title: 'Спринт', link: 'sprint.html' },
      { title: 'Саванна', link: 'savannah.html' },
      { title: 'Аудиовызов', link: 'audiocall.html' },
    ],
    icon: 'puzzle',
  },
  {
    title: 'Статистика', link: 'statistics.html', child: [], icon: 'statistics',
  },
  {
    title: 'Словарь', link: 'dictionary.html', child: [], icon: 'dictionary',
  },
  {
    title: 'Настройки', link: 'setting.html', child: [], icon: 'adjust',
  },
  {
    title: 'О команде', link: 'about.html', child: [], icon: 'info',
  },
  {
    title: 'Выход', link: 'authorization.html', child: [], icon: 'logout',
  },
];

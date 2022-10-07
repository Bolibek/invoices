export const formatDate = convertData =>
  `${new Intl.DateTimeFormat('en-UK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(convertData))}`

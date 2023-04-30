import { Box, Typography, Paper } from '@mui/material';
import notifications from '../../helpers/news.json';

function News() {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 4, color: "#ffffff" }}>
        お知らせ
      </Typography>
      {notifications.map((notification) => (
        <Paper key={notification.id} sx={{ padding: 3, marginBottom: 4 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            {notification.title}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            {notification.content}
          </Typography>
          <Typography variant="caption">{notification.date}</Typography>
        </Paper>
      ))}
    </Box>
  );
}

export default News;

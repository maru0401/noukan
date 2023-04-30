import { Box, Typography, Paper } from '@mui/material';
import notifications from '../../helpers/news.json';
import { Link } from "react-router-dom";

function News() {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 4, color: "#ffffff" }}>
        お知らせ
      </Typography>
      {notifications.map((notification) => (
        <Paper key={notification.id} sx={{ padding: 3, marginBottom: 4 }}>
          <Typography variant="h6" sx={{ marginBottom: 2, whiteSpace: 'pre-line' }}>
            {notification.title}
          </Typography>
          <Typography variant="body1" sx={{
            marginBottom: 2,
            whiteSpace: 'pre-line'
          }}>
            {notification.content}
            {notification?.link && <Link target="_blank" rel="noopener noreferrer" to={notification.link[0]} >{notification.link[1]}</Link>}
          </Typography>
          <Typography variant="caption">{notification.date}</Typography>
        </Paper>
      ))}
    </Box>
  );
}

export default News;

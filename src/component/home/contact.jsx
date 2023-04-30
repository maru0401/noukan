import { Link } from "react-router-dom";
import { Box, Typography, Paper } from '@mui/material';
import notifications from '../../helpers/news.json';

function Contact() {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 4, color: "#ffffff" }}>
        お問い合わせ
      </Typography>
      {notifications.map((notification) => (
        <Paper key={notification.id} sx={{ padding: 3, marginBottom: 4 }}>
      <Typography variant="body1" sx={{ mb: 2, color: "black" }}>
        お問い合わせはGithubまで<br />
        <Link target="_blank" rel="noopener noreferrer" to={"https://github.com/maru0401/noukan"} >Github</Link><br/>
        バグや誤字脱字などはリポジトリにPRしていただけると幸いです。(PR先はDevelopブランチにしてください)<br />
        また、そのほかの問題や、質問などがありましたらissuesでお知らせください。
      </Typography>
        </Paper>
      ))}
    </Box>
  );
}

export default Contact;

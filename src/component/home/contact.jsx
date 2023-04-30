import { Link } from "react-router-dom";
import { Box, Typography, Paper } from '@mui/material';

function Contact() {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 4, color: "#ffffff" }}>
        お問い合わせ
      </Typography>
      <Paper sx={{ padding: 3, marginBottom: 4 }}>
        <Typography variant="body1" sx={{ mb: 2, color: "black" }}>
          お問い合わせはGithubまで<br />
          <Link target="_blank" rel="noopener noreferrer" to={"https://github.com/maru0401/noukan"} >Github</Link><br />
          バグや誤字脱字などはリポジトリにPRしていただけると幸いです。(PR先はDevelopブランチにしてください)<br />
          また、そのほかの問題や、質問などがありましたらissuesでお知らせください。<br />
          また、TwitterのDMでも可能です。<br />
          <Link target="_blank" rel="noopener noreferrer" to={"https://twitter.com/MaruNougyou"} >Twitter</Link><br />
        </Typography>
      </Paper>
    </Box>
  );
}

export default Contact;

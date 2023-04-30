import { Button, Grid, Box, Typography, useMediaQuery } from "@mui/material";

const Home = () => {
  const isSmallScreen = useMediaQuery("(max-width:690px)");
  const isverySmallScreen = useMediaQuery("(max-width:340px)");
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
      sx={{ color: "white" }}
    >
      <Box
        pt={5}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          p: 1,
          margin: "20px",
          color: "#ffffff",
        }}
      >
        <img
          src="./images/panda.webp"
          alt="panda"
          style={{ width: isSmallScreen ? "50px" : "100px", height: isSmallScreen ? "50px" : "100px" }}
        />
        <Box ml={2}>
          <div>
            <Typography variant={isSmallScreen ? "h6" : "h3"}>
              農業鑑定模擬試験β
            </Typography>
            <Typography fontSize={isSmallScreen ? "15px" : "20px"}>
              当サービスは有志によって作られたものです。
            </Typography>
            <Typography color={"gray"} fontSize={isSmallScreen ? "13px" : "15px"}>
              ※現在食品の問題のみプレイできます(食品の問題の製作途中です)<br />画像提供＆問題の提供受付中
            </Typography>
          </div>
        </Box>
      </Box>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Box sx={{ display: "flex", gap: 2, my: 2 }}>
          <Button
            sx={{
              color: "white",
              bgcolor: "success.main",
              width: isSmallScreen ? isverySmallScreen ? "70px" : "100px" : "200px",
              height: isSmallScreen ? "40px" : "60px",
              fontSize: isSmallScreen ? isverySmallScreen ? 6 : 13 : 20,
            }}
            href="/work?id=agriculture"
            component="a"
          >
            農業分野
          </Button>
          <Button
            sx={{
              color: "white",
              bgcolor: "success.main",
              width: isSmallScreen ? isverySmallScreen ? "70px" : "100px" : "200px",
              height: isSmallScreen ? "40px" : "60px",
              fontSize: isSmallScreen ? isverySmallScreen ? 6 : 13 : 20,
            }}
            href="/work?id=food"
            component="a"
          >
            食品分野
          </Button>
          <Button
            sx={{
              color: "white",
              bgcolor: "success.main",
              width: isSmallScreen ? isverySmallScreen ? "70px" : "100px" : "200px",
              height: isSmallScreen ? "40px" : "60px",
              fontSize: isSmallScreen ? isverySmallScreen ? 6 : 13 : 20,
            }}
            href="/work?id=gardening"
            component="a"
          >
            園芸分野
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;

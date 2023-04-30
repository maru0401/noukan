import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMediaQuery, Typography, CssBaseline, Button } from "@mui/material";
import Work from "./work";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import qt from "query-string";
import setting from "../../helpers/setting.json";
import agriculture from "../../helpers/quizes/agriculture.json";
import food from "../../helpers/quizes/food.json";
import gardening from "../../helpers/quizes/gardening.json";
import Cookies from "js-cookie";
const list = ["agriculture", "food", "gardening"];
const numcheck = num => Number.isInteger(parseInt(Cookies.get(`${num}`) || 0));
function isBoolean(str) {
  return /^true$|^false$/i.test(Cookies.get(`${str}`) || "false");
};
const WorkHeader = () => {
  let max = setting.maxquize;
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const search = useLocation().search;
  const query = qt.parse(search);
  if (Cookies.get("random") === "false" && Cookies.get(`${query.id}endrange`)) max = Number(Cookies.get(`${query.id}endrange`));
  return (
    <>
      <ThemeProvider
        theme={createTheme({
          palette: {
            background: {
              default: "#1C1C1C",
            },
          },
        })}
      >
        <CssBaseline />
        {Object.keys(query.id === "agriculture" ? agriculture : query.id === "food" ? food : gardening).length < max || !list.includes(query.id) || !numcheck(`${query.id}endrange`) || !numcheck(`${query.id}startrange`) || !numcheck(`change`) || !isBoolean("random") || !isBoolean("20change") ? (
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <Typography color={"red"} variant="h6" >
              {!list.includes(query.id) ? "クエリが無効です" : !numcheck(`${query.id}endrange`) ? "終了値が不正です" : !numcheck(`${query.id}startrange`) ? "開始値が不正です" : !isBoolean("random") ? "設定値が無効です" : !isBoolean("20change") ? "設定値が無効です" : !numcheck(`change`) ? "切り替え秒数が無効です" : `不明なエラー:debug/${JSON.stringify(Cookies.get())}/${Cookies.get(`${query.id}endrange`)}/${max}`
              }
              <br />
              ループを回避しました。
            </Typography>
            <Link to="../" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  color: "white",
                  bgcolor: "red",
                  width: isSmallScreen ? "130px" : "200px",
                  height: isSmallScreen ? "40px" : "60px",
                  fontSize: isSmallScreen ? 13 : 20,
                  marginTop: 2,
                }}
              >
                ホームへ戻る
              </Button>
            </Link>
          </div>

        ) : (
          <Work />
        )}
      </ThemeProvider>
    </>
  );
};

export default WorkHeader;

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  Drawer,
  CssBaseline,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import HOME from "./home";
import TOS from "./tosheader";
import NEWS from "./news";
import SETTING from "./setting";
import CONTACT from "./contact";

const HomeHeader = () => {
  const isSmallScreen = useMediaQuery("(max-width:890px)");
  const [isOpen, setIsOpen] = useState(false);
  const [base_select, setBaseSelect] = useState("home");
  const toggleDrawer = (open) => () => setIsOpen(open);
  const closeDrawer = () => setIsOpen(false);

  return (
    <>
      {isSmallScreen && (
        <AppBar position="static" sx={{ backgroundColor: "#333333" }}>
          <Toolbar>
            <IconButton sx={{ color: "#ffffff" }} aria-label="メニューを表示" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, textAlign: "right", marginRight: "3px" }}
            >
              農業鑑定模擬試験
            </Typography>
          </Toolbar>
          <Drawer
            anchor="left"
            open={isOpen}
            aria-label="メニュー"
            onClose={toggleDrawer(false)}
            PaperProps={{
              sx: {
                backgroundColor: "#333333",
                color: "#ffffff",
              },
            }}
          >
            <MenuList>
              <MenuItem
                onClick={() => {
                  setBaseSelect("home");
                  closeDrawer();
                }}
                aria-label="ホームに移動する"
              >
                ホーム
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setBaseSelect("setting");
                  closeDrawer();
                }}
                aria-label="設定を変更する"
              >
                設定
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setBaseSelect("tos");
                  closeDrawer();
                }}
                aria-label="利用規約を表示する"
              >
                利用規約
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setBaseSelect("news");
                  closeDrawer();
                }}
                aria-label="お知らせを表示する"
              >
                お知らせ
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setBaseSelect("contact");
                  closeDrawer();
                }}
                aria-label="問い合わせフォームを表示する"
              >
                問い合わせ
              </MenuItem>
            </MenuList>
          </Drawer>
        </AppBar>
      )}
      {!isSmallScreen && (
        <AppBar position="static" sx={{ backgroundColor: "#333333" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, ml: 3 }}>
              農業鑑定模擬試験
            </Typography>
            <MenuList sx={{ display: "flex", flexWrap: "wrap" }}>
              <MenuItem onClick={() => setBaseSelect("home")}>ホーム</MenuItem>
              <MenuItem onClick={() => setBaseSelect("setting")}>設定</MenuItem>
              <MenuItem onClick={() => setBaseSelect("tos")}>利用規約</MenuItem>
              <MenuItem onClick={() => setBaseSelect("news")}>
                お知らせ
              </MenuItem>
              <MenuItem onClick={() => setBaseSelect("contact")}>問い合わせ</MenuItem>
            </MenuList>
          </Toolbar>
        </AppBar>
      )}
      <ThemeProvider
        theme={createTheme({
          typography: {
            body1: { fontSize: 14 },
          },
          palette: {
            background: {
              default: "#1C1C1C",
            },
          },
        })}
      >
        <CssBaseline />
        {base_select === "home" && <HOME />}
        {base_select === "tos" && <TOS />}
        {base_select === "news" && <NEWS />}
        {base_select === "setting" && <SETTING />}
        {base_select === "contact" && <CONTACT />}
      </ThemeProvider>
    </>
  );
};

export default HomeHeader;

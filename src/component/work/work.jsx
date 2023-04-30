import { useLocation, Link } from "react-router-dom";
import qt from "query-string";
import agriculture from "../../helpers/quizes/agriculture.json";
import food from "../../helpers/quizes//food.json";
import gardening from "../../helpers/quizes/gardening.json";
import setting from "../../helpers/setting.json";
import { ArrowBack } from '@mui/icons-material';
import CardMedia from '@mui/material/CardMedia';
import { Box, TextField, Typography, Button, useMediaQuery, Table, TableHead, TableRow, TableCell, TableBody, Grid, Tabs, Tab } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import TabPanel from "./tab";
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const list = { agriculture: "農業", food: "食品", gardening: "園芸" };
let max = setting.maxquize;
let timer = setting.timer;
const random_array = (num, max, min = 0) => {
  const arr = [];
  while (arr.length < num) {
    const random = Math.floor(Math.random() * (max - min + 1) + min);
    if (!arr.includes(random)) arr.push(random);
  };
  return arr.map((c) => c + 1);
};

const quize = [];
//agriculture
quize["agriculture"] = random_array((Cookies.get(`agriculturemax`)) ? Number(Cookies.get(`agriculturemax`)) - 1 : Number(Cookies.get(`agricultureendrange`) || setting.maxquize) - Number(Cookies.get(`agriculturestartrange`) || 1) + 1, Number(Cookies.get(`agricultureendrange`) || setting.maxquize) - 1, Number(Cookies.get(`agriculturestartrange`) || 1) - 1 || 0);
//food
quize["food"] = random_array((Cookies.get(`foodmax`)) ? Number(Cookies.get(`foodmax`)) : Number(Cookies.get(`foodendrange`) || setting.maxquize) - Number(Cookies.get(`foodstartrange`) || 1) + 1, Number(Cookies.get(`foodendrange`) || setting.maxquize) - 1, Number(Cookies.get(`foodstartrange`) || 1) - 1 || 0);
//gardening
quize["gardening"] = random_array((Cookies.get(`gardeningmax`)) ? Number(Cookies.get(`gardeningmax`)) - 1 : Number(Cookies.get(`gardeningendrange`) || setting.maxquize) - Number(Cookies.get(`gardeningstartrange`) || 1) + 1, Number(Cookies.get(`gardeningendrange`) || setting.maxquize) - 1, Number(Cookies.get(`gardeningstartrange`) || 1) - 1 || 0);
const Work = () => {
  const ref = useRef(null);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isbigScreen = useMediaQuery("(max-width:850px)");
  const isverybigScreen = useMediaQuery("(max-width:1800px)");
  const isverySmallScreen = useMediaQuery("(max-width:340px)");
  const search = useLocation().search;
  const query = qt.parse(search);
  max = Number(Cookies.get(`${query.id}endrange`) || setting.maxquize) - Number(Cookies.get(`${query.id}startrange`) || 0);
  if (Cookies.get("20change") !== false && Cookies.get(`change`)) timer = Number(Cookies.get(`change`));
  const [data, setdata] = useState({ count: 1, quize_size: Cookies.get("random") === "false" ? Number(Cookies.get(`${query.id}startrange`) || 1) : 1, time: timer });
  const [tmp, settmp] = useState([]);
  const [must, setmust] = useState(false);
  const [text, setText] = useState("");
  const [TabValue, setTab] = useState(0);

  const TabChange = (event, newValue) => setTab(newValue);
  const handleChange = (event) => setText(event.target.value);
  useEffect(() => {
    const timer = setInterval(
      () =>
        setdata((data) => ({
          ...data,
          count: data.count + 1,
          time: (Cookies.get("20change") || "false") === "false" ? timer : data.time - 1,
        })),
      1000
    );
    if ((Cookies.get("random") !== "false" ? data.quize_size - quize[query.id].length + max : data.quize_size - Number(Cookies.get(`${query.id}startrange`) || 0)) > max) return clearInterval(timer);
    return () => clearInterval(timer);
  }, [data.quize_size, query.id]);
  useEffect(() => {
    if (Number(data.time) <= 0) {
      if ((Cookies.get("random") !== "false" ? data.quize_size - quize[query.id].length + max : data.quize_size - Number(Cookies.get(`${query.id}startrange`) || 0)) > max) return;
      setdata((data) => ({
        ...data,
        quize_size: data.quize_size + 1,
        time: timer
      }));
      settmp((data) => [...data, ref.current?.value]);
      setText("");
    }
  }, [data, query.id]);
  const reset = () => {
    //agriculture
    quize["agriculture"] = random_array((Cookies.get(`agriculturemax`)) ? Number(Cookies.get(`agriculturemax`)) - 1 : Number(Cookies.get(`agricultureendrange`) || setting.maxquize) - Number(Cookies.get(`agriculturestartrange`) || 1) + 1, Number(Cookies.get(`agricultureendrange`) || setting.maxquize) - 1, Number(Cookies.get(`agriculturestartrange`) || 1) - 1 || 0);
    //food
    quize["food"] = random_array((Cookies.get(`foodmax`)) ? Number(Cookies.get(`foodmax`)) : Number(Cookies.get(`foodendrange`) || setting.maxquize) - Number(Cookies.get(`foodstartrange`) || 1) + 1, Number(Cookies.get(`foodendrange`) || setting.maxquize) - 1, Number(Cookies.get(`foodstartrange`) || 1) - 1 || 0);
    //gardening
    quize["gardening"] = random_array((Cookies.get(`gardeningmax`)) ? Number(Cookies.get(`gardeningmax`)) - 1 : Number(Cookies.get(`gardeningendrange`) || setting.maxquize) - Number(Cookies.get(`gardeningstartrange`) || 1) + 1, Number(Cookies.get(`gardeningendrange`) || setting.maxquize) - 1, Number(Cookies.get(`gardeningstartrange`) || 1) - 1 || 0);
    //use
    setdata({ count: 1, quize_size: Cookies.get("random") === "false" ? Number(Cookies.get(`${query.id}startrange`) || 1) : 1, time: timer });
    settmp([]);
    setmust(false);
    setText("");
  };
  const MissReturn = () => {
    const quizetmp = [];
    quize[query.id].map((id, index) => {
      const check = (query.id === "agriculture" ? agriculture[String(id)] : query.id === "food" ? food[String(id)] : gardening[String(id)]);
      console.log(check)
      if (!check?.answers?.includes(tmp[index] || "無回答")) {
        quizetmp.push(id);
      };
      return 0;
    });
    quize[query.id] = quizetmp;
    //use
    setdata({ count: 1, quize_size: Cookies.get("random") === "false" ? Number(Cookies.get(`${query.id}startrange`) || 1) : 1, time: timer });
    settmp([]);
    setmust(false);
    setText("");
  };
  const identical = () => {
    setdata({ count: 1, quize_size: Cookies.get("random") === "false" ? Number(Cookies.get(`${query.id}startrange`) || 1) : 1, time: timer });
    settmp([]);
    setmust(false);
    setText("");
  };
  const click_answer = (e) => {
    if (!e?.key || e.key === 'Enter') {
      if (Cookies.get("20change") === "true") return;
      if (!must) setmust(Cookies.get(`onequize`) === "true" ? true : false);
      if (!must) settmp((data) => [...data, ref.current?.value]);
      if (must || !(Cookies.get(`onequize`) === "true" ? true : false)) {
        setmust(false);
        setdata((data) => ({
          ...data,
          quize_size: data.quize_size + 1,
          time: timer,
        }));
        setText("");
      };
    };
  };
  const minutes = Math.floor((data.count - 1) / 60);
  const seconds = (data.count - 1) % 60;
  return (
    <>
      {!((Cookies.get("random") !== "false" ? data.quize_size - quize[query.id].length + max : data.quize_size - Number(Cookies.get(`${query.id}startrange`) || 0)) > max) && <Link to="../" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBack />}
          sx={{
            color: "white",
            bgcolor: "red",
            width: "120px",
            height: "30px",
            fontSize: "10px",
            borderRadius: "20px",
            marginLeft: "10px",
            marginTop: "10px",
            boxShadow: "none",
            '&:hover': {
              backgroundColor: "#ff0000",
              boxShadow: "none",
            },
          }}
          onClick={reset}
        >
          ホームへ戻る
        </Button>
      </Link>}
      <Typography align="center" pt={5} color={"white"} variant="h5">
        分野:{list[query?.id] || "読み込みに失敗"}
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <Box
          border={1}
          borderColor="grey.400"
          borderRadius={10}
          padding={3}
          width={isSmallScreen ? "100%" : isbigScreen ? ((Cookies.get("random") !== "false" ? data.quize_size - quize[query.id].length + max : data.quize_size - Number(Cookies.get(`${query.id}startrange`) || 0)) > max) ? "100%" : "80%" : ((Cookies.get("random") !== "false" ? data.quize_size - quize[query.id].length + max : data.quize_size - Number(Cookies.get(`${query.id}startrange`) || 0)) > max) ? "80%" : "750px"}
          style={{ backgroundColor: "white" }}
        >
          {(Cookies.get("random") !== "false" ? data.quize_size - quize[query.id].length + max : data.quize_size - Number(Cookies.get(`${query.id}startrange`) || 0)) > max ? (
            <>
              <Tabs value={TabValue} onChange={TabChange} aria-label="basic tabs example">
                <Tab label="すべての結果" {...a11yProps(0)} />
                <Tab label="間違いのみ" {...a11yProps(1)} />
                <Tab label="正解のみ" {...a11yProps(2)} />
              </Tabs>
              <TabPanel value={TabValue} index={0}>
                <Typography>結果</Typography>
                <Table>
                  <TableHead>
                    <TableRow >
                      {!isverybigScreen && <TableCell style={{
                        maxWidth: 1,
                      }}>問題ID</TableCell>}
                      <TableCell>問題文</TableCell>
                      <TableCell>回答</TableCell>
                      <TableCell>正答</TableCell>
                      {!isverybigScreen && <TableCell>〇✖</TableCell>}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(Cookies.get("random") === "false" ? Array.from({ length: (Cookies.get("random") === "false" && !Cookies.get(`${query.id}startrange`)) ? max : max + 1 }, (_, index) => index + 1) : quize[query.id]).map((id, index) => (
                      <TableRow key={index}>
                        {!isverybigScreen && <TableCell style={{ maxWidth: 1 }}>{Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id}</TableCell>}
                        <TableCell
                          style={{
                            whiteSpace: "normal",
                            wordWrap: "break-word",
                            maxWidth: isbigScreen ? isverySmallScreen ? 50 : 100 : 300,
                            fontSize: !isSmallScreen || "10px"
                          }}
                        >
                          {query.id === "agriculture"
                            ? agriculture[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]?.quize
                            : query.id === "food"
                              ? food[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]?.quize
                              : gardening[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]?.quize}
                        </TableCell>
                        <TableCell
                          style={{
                            whiteSpace: "normal",
                            wordWrap: "break-word",
                            maxWidth: isverySmallScreen ? 50 : 100,
                            fontSize: !isSmallScreen || "10px"
                          }}
                        >
                          {tmp[index] || "無回答"}
                        </TableCell>
                        <TableCell style={{
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                          maxWidth: isverySmallScreen ? 50 : 100,
                          fontSize: !isSmallScreen || "10px"
                        }}>
                          {(query.id === "agriculture"
                            ? agriculture[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]
                            : query.id === "food"
                              ? food[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]
                              : gardening[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]
                          )?.answers.join("|")}
                        </TableCell>
                        {!isverybigScreen && (
                          <TableCell
                            style={{
                              whiteSpace: "normal",
                              wordWrap: "break-word",
                              maxWidth: isSmallScreen ? 50 : 200,
                            }}
                          >
                            {(query.id === "agriculture"
                              ? agriculture[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]
                              : query.id === "food"
                                ? food[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]
                                : gardening[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]
                            )?.answers?.includes(tmp[index] || "無回答")
                              ? "〇"
                              : "✖"}
                          </TableCell>
                        )}
                      </TableRow>
                    ))}

                  </TableBody>
                </Table>
              </TabPanel>
              <TabPanel value={TabValue} index={1}>
                <Typography>結果</Typography>
                <Table>
                  <TableHead>
                    <TableRow >
                      {!isSmallScreen && <TableCell>問題ID</TableCell>}
                      <TableCell>問題文</TableCell>
                      <TableCell>回答</TableCell>
                      <TableCell>正答</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      (Cookies.get("random") === "false" ? Array.from({ length: (Cookies.get("random") === "false" && !Cookies.get(`${query.id}startrange`)) ? max : max + 1 }, (_, index) => index + 1) : quize[query.id]).map((id, index) => (
                        !(query.id === "agriculture" ? agriculture[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)] : query.id === "food" ? food[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)] : gardening[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)])?.answers?.includes(tmp[index] || "無回答") &&
                        <TableRow key={index}>
                          {!isSmallScreen && <TableCell style={{ maxWidth: 1 }}>{Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id}</TableCell>}
                          <TableCell
                            style={{
                              whiteSpace: "normal",
                              wordWrap: "break-word",
                              maxWidth: isbigScreen ? isverySmallScreen ? 50 : 100 : 300,
                              fontSize: !isSmallScreen || "10px"
                            }}
                          >
                            {query.id === "agriculture"
                              ? agriculture[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]?.quize
                              : query.id === "food"
                                ? food[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]?.quize
                                : gardening[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]?.quize}
                          </TableCell>
                          <TableCell
                            style={{
                              whiteSpace: "normal",
                              wordWrap: "break-word",
                              maxWidth: isverySmallScreen ? 50 : 100,
                              fontSize: !isSmallScreen || "10px"
                            }}
                          >
                            {tmp[index] || "無回答"}
                          </TableCell>
                          <TableCell style={{
                            whiteSpace: "normal",
                            wordWrap: "break-word",
                            maxWidth: isverySmallScreen ? 50 : 100,
                            fontSize: !isSmallScreen || "10px"
                          }}>
                            {(query.id === "agriculture"
                              ? agriculture[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]
                              : query.id === "food"
                                ? food[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]
                                : gardening[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]
                            )?.answers.join("|")}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TabPanel>
              <TabPanel value={TabValue} index={2}>
                <Typography>結果</Typography>
                <Table>
                  <TableHead>
                    <TableRow >
                      {!isSmallScreen && <TableCell>問題ID</TableCell>}
                      <TableCell>問題文</TableCell>
                      <TableCell>回答</TableCell>
                      <TableCell>正答</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      (Cookies.get("random") === "false" ? Array.from({ length: (Cookies.get("random") === "false" && !Cookies.get(`${query.id}startrange`)) ? max : max + 1 }, (_, index) => index + 1) : quize[query.id]).map((id, index) => (
                        (query.id === "agriculture" ? agriculture[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)] : query.id === "food" ? food[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)] : gardening[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)])?.answers?.includes(tmp[index] || "無回答") &&
                        <TableRow key={index}>
                          {!isSmallScreen && <TableCell style={{ maxWidth: 1 }}>{Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id}</TableCell>}
                          <TableCell
                            style={{
                              whiteSpace: "normal",
                              wordWrap: "break-word",
                              maxWidth: isbigScreen ? isverySmallScreen ? 50 : 100 : 300,
                              fontSize: !isSmallScreen || "10px"
                            }}
                          >
                            {query.id === "agriculture"
                              ? agriculture[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]?.quize
                              : query.id === "food"
                                ? food[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]?.quize
                                : gardening[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]?.quize}
                          </TableCell>
                          <TableCell
                            style={{
                              whiteSpace: "normal",
                              wordWrap: "break-word",
                              maxWidth: isverySmallScreen ? 50 : 100,
                              fontSize: !isSmallScreen || "10px"
                            }}
                          >
                            {tmp[index] || "無回答"}
                          </TableCell>
                          <TableCell style={{
                            whiteSpace: "normal",
                            wordWrap: "break-word",
                            maxWidth: isverySmallScreen ? 50 : 100,
                            fontSize: !isSmallScreen || "10px"
                          }}>
                            {(query.id === "agriculture"
                              ? agriculture[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]
                              : query.id === "food"
                                ? food[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]
                                : gardening[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]
                            )?.answers.join("|")}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TabPanel>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>合計</TableCell>
                    <TableCell>{(Cookies.get("random") === "false" ? Array.from({ length: (Cookies.get("random") === "false" && !Cookies.get(`${query.id}startrange`)) ? max : max + 1 }, (_, index) => index + 1) : quize[query.id]).filter((id, index) => (query.id === "agriculture"
                      ? agriculture[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]
                      : query.id === "food"
                        ? food[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]
                        : gardening[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]
                    )?.answers?.includes(tmp[index] || "無回答")).length}/{(Cookies.get("random") === "false" ? Array.from({ length: (Cookies.get("random") === "false" && !Cookies.get(`${query.id}startrange`)) ? max : max + 1 }, (_, index) => index + 1) : quize[query.id]).length}点</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>合否(6割合格)</TableCell>
                    <TableCell>{((Cookies.get("random") === "false" ? Array.from({ length: (Cookies.get("random") === "false" && !Cookies.get(`${query.id}startrange`)) ? max : max + 1 }, (_, index) => index + 1) : quize[query.id]).filter((id, index) => (query.id === "agriculture"
                      ? agriculture[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]
                      : query.id === "food"
                        ? food[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]
                        : gardening[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]
                    )?.answers?.includes(tmp[index] || "無回答")).length >= ((Cookies.get("random") === "false" ? Array.from({ length: (Cookies.get("random") === "false" && !Cookies.get(`${query.id}startrange`)) ? max : max + 1 }, (_, index) => index + 1) : quize[query.id]).length * 0.6)) ? <Typography color={"red"}> 合格 </Typography> : <Typography color={"blue"}> 不合格 </Typography>}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>時間</TableCell>
                    <TableCell>{minutes === 0 ? "" : minutes + "分"}
                      {seconds}秒</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <ResponsiveContainer width="95%" height={80}>
                <BarChart data={[{
                  name: `${Math.round(((Cookies.get("random") === "false" ? Array.from({ length: (Cookies.get("random") === "false" && !Cookies.get(`${query.id}startrange`)) ? max : max + 1 }, (_, index) => index + 1) : quize[query.id]).filter((id, index) => (query.id === "agriculture" ? agriculture[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)] : query.id === "food" ? food[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)] : gardening[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]
                  )?.answers?.includes(tmp[index] || "無回答")).length / ((Cookies.get("random") === "false" ? Array.from({ length: (Cookies.get("random") === "false" && !Cookies.get(`${query.id}startrange`)) ? max : max + 1 }, (_, index) => index + 1) : quize[query.id]).length)) * 100)}%`, value: Math.round(((Cookies.get("random") === "false" ? Array.from({ length: (Cookies.get("random") === "false" && !Cookies.get(`${query.id}startrange`)) ? max : max + 1 }, (_, index) => index + 1) : quize[query.id]).filter((id, index) => (query.id === "agriculture" ? agriculture[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)] : query.id === "food" ? food[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)] : gardening[String(Cookies.get("random") === "false" ? id + (Number(Cookies.get(`${query.id}startrange`) || 1) - 1) : id)]
                  )?.answers?.includes(tmp[index] || "無回答")).length / ((Cookies.get("random") === "false" ? Array.from({ length: (Cookies.get("random") === "false" && !Cookies.get(`${query.id}startrange`)) ? max : max + 1 }, (_, index) => index + 1) : quize[query.id]).length)) * 100)
                }]} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
              <Grid container justifyContent="flex-end" sx={{ display: "flex", gap: 2, my: 2 }}>
                <Grid item>
                  <Button variant="contained" color="success" size={isSmallScreen ? "small" : "large"} sx={{
                    color: "white",
                    bgcolor: "green",
                    fontSize: 11,
                    marginTop: 2
                  }} onClick={() => identical()} >
                    同一問をプレイ
                  </Button>
                </Grid>
                {(Cookies.get("random") || "true") === "true" && <Grid item>
                  <Button variant="contained" color="success" size={isSmallScreen ? "small" : "large"} sx={{
                    color: "white",
                    bgcolor: "green",
                    fontSize: 11,
                    marginTop: 2
                  }} onClick={() => MissReturn()} >
                    誤答問をプレイ
                  </Button>
                </Grid>}
                <Grid item>
                  <Button variant="contained" color="success" size={isSmallScreen ? "small" : "large"} sx={{
                    color: "white",
                    bgcolor: "green",
                    fontSize: 11,
                    marginTop: 2
                  }} onClick={() => reset()} >
                    新しくプレイ
                  </Button>
                </Grid>
                <Grid item>
                  <Link to="../" style={{ textDecoration: "none" }}>
                    <Button variant="contained" color="primary" size={isSmallScreen ? "small" : "large"} sx={{
                      color: "white",
                      bgcolor: "blue",
                      fontSize: 11,
                      marginTop: 2
                    }} onClick={reset} >
                      ホームへ戻る
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </>
          ) : (
            (must ?
              <>
                <Typography sx={{ mb: 2 }} style={{ whiteSpace: "normal", wordWrap: "break-word", maxWidth: isSmallScreen ? 400 : 599 }} display="inline">
                  問題文:{(query.id === "agriculture" ? agriculture[Cookies.get("random") === "true" ? quize[query.id][Number(data.quize_size - 1)] : String(Number(Cookies.get(`${query.id}startrange`)) + data.quize_size - 1)] : query.id === "food" ? food[Cookies.get("random") === "true" ? quize[query.id][Number(data.quize_size - 1)] : String(Number(Cookies.get(`${query.id}startrange`)) + data.quize_size - 1)] : gardening[Cookies.get("random") === "true" ? quize[query.id][Number(data.quize_size - 1)] : String(Number(Cookies.get(`${query.id}startrange`)) + data.quize_size - 1)])?.quize}<br />

                  {(query.id === "agriculture" ? agriculture : query.id === "food" ? food : gardening)[Cookies.get("random") === "true" ? quize[query.id][Number(data.quize_size - 1)] : String(Number(Cookies.get(`${query.id}startrange`)) + data.quize_size - 1)]?.image ? (query.id === "agriculture" ? agriculture : query.id === "food" ? food : gardening)[Cookies.get("random") === "true" ? quize[query.id][Number(data.quize_size - 1)] : String(Number(Cookies.get(`${query.id}startrange`)) + data.quize_size - 1)]?.mask
                    ?
                    <Typography sx={{ mb: 2 }} style={{ whiteSpace: "normal", wordWrap: "break-word", maxWidth: isSmallScreen ? 400 : 599 }} > 参考画像
                      <br /><Link target="_blank" rel="noopener noreferrer" to={(query.id === "agriculture" ? agriculture : query.id === "food" ? food : gardening)[Cookies.get("random") === "true" ? quize[query.id][Number(data.quize_size - 1)] : String(Number(Cookies.get(`${query.id}startrange`)) + data.quize_size - 1)].image} >画像先へ</Link></Typography> : <>
                      <Typography sx={{ mb: 2 }} style={{ whiteSpace: "normal", wordWrap: "break-word", maxWidth: isSmallScreen ? 400 : 599 }} >
                        参考画像
                      </Typography>
                      <CardMedia component="img" image={(query.id === "agriculture" ? agriculture : query.id === "food" ? food : gardening)[Cookies.get("random") === "true" ? quize[query.id][Number(data.quize_size - 1)] : String(Number(Cookies.get(`${query.id}startrange`)) + data.quize_size - 1)].image} alt="画像" style={{ width: isSmallScreen ? isverySmallScreen ? "200px" : "300px" : '550px' }} /></>
                    : (Number(Cookies.get(`${query.id}startrange`)) + data.quize_size - 1)}
                  回答:{tmp[tmp.length - 1]}<br />
                  正答:{(query.id === "agriculture" ? agriculture[Cookies.get("random") === "true" ? quize[query.id][Number(data.quize_size - 1)] : String(Number(Cookies.get(`${query.id}startrange`)) + data.quize_size - 1)] : query.id === "food" ? food[Cookies.get("random") === "true" ? quize[query.id][Number(data.quize_size - 1)] : String(Number(Cookies.get(`${query.id}startrange`)) + data.quize_size - 1)] : gardening[Cookies.get("random") === "true" ? quize[query.id][Number(data.quize_size - 1)] : String(Number(Cookies.get(`${query.id}startrange`)) + data.quize_size - 1)])?.answers?.join("|")}<br />
                  判定:<Typography color={(query.id === "agriculture" ? agriculture[Cookies.get("random") === "true" ? quize[query.id][Number(data.quize_size - 1)] : String(Number(Cookies.get(`${query.id}startrange`)) + data.quize_size - 1)] : query.id === "food" ? food[Cookies.get("random") === "true" ? quize[query.id][Number(data.quize_size - 1)] : String(Number(Cookies.get(`${query.id}startrange`)) + data.quize_size - 1)] : gardening[Cookies.get("random") === "true" ? quize[query.id][Number(data.quize_size - 1)] : String(Number(Cookies.get(`${query.id}startrange`)) + data.quize_size - 1)])?.answers?.includes(tmp[tmp.length - 1] || "無回答") ? "red" : "blue"} display="inline">
                    {(query.id === "agriculture" ? agriculture[Cookies.get("random") === "true" ? quize[query.id][Number(data.quize_size - 1)] : String(Number(Cookies.get(`${query.id}startrange`)) + data.quize_size - 1)] : query.id === "food" ? food[Cookies.get("random") === "true" ? quize[query.id][Number(data.quize_size - 1)] : String(Number(Cookies.get(`${query.id}startrange`)) + data.quize_size - 1)] : gardening[Cookies.get("random") === "true" ? quize[query.id][Number(data.quize_size - 1)] : String(Number(Cookies.get(`${query.id}startrange`)) + data.quize_size - 1)])?.answers?.includes(tmp[tmp.length - 1] || "無回答") ? "正解" : "不正解"}
                  </Typography>
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    sx={{ width: "100px", height: "40px", fontSize: 13 }}
                    onClick={click_answer}
                  >
                    次の問題へ
                  </Button>
                </Box>
              </>
              :
              <>
                {(Cookies.get("20change") || "false") !== "false" && (
                  <Typography align="center" color={data.time <= 3 && "red"}>
                    回答時間:{data.time}秒
                  </Typography>
                )}
                <Typography
                  sx={{ mb: 2 }}
                  style={{
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    maxWidth: isSmallScreen ? 400 : 599,
                  }}
                >
                  第{Number(data.quize_size)}問 <br />
                  {
                    (query.id === "agriculture"
                      ? agriculture
                      : query.id === "food"
                        ? food
                        : gardening)[
                      Cookies.get("random") === "false"
                        ? data.quize_size
                        : String(quize[query.id][Number(data.quize_size) - 1])
                    ]?.quize
                  }
                </Typography>
                {(query.id === "agriculture" ? agriculture : query.id === "food" ? food : gardening)[Cookies.get("random") === "false" ? data.quize_size : String(quize[query.id][Number(data.quize_size) - 1])]?.image ? (query.id === "agriculture" ? agriculture : query.id === "food" ? food : gardening)[Cookies.get("random") === "false" ? data.quize_size : String(quize[query.id][Number(data.quize_size) - 1])
                ]?.mask ? <Typography
                  sx={{ mb: 2 }}
                  style={{
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    maxWidth: isSmallScreen ? 400 : 599,
                  }}
                >
                  参考画像
                  <br /><Link target="_blank" rel="noopener noreferrer" to={(query.id === "agriculture" ? agriculture : query.id === "food" ? food : gardening)[Cookies.get("random") === "false" ? data.quize_size : String(quize[query.id][Number(data.quize_size) - 1])].image} >画像先へ</Link>
                </Typography> :
                  <>
                    <Typography sx={{ mb: 2 }} style={{ whiteSpace: "normal", wordWrap: "break-word", maxWidth: isSmallScreen ? 400 : 599, }} >
                      参考画像
                    </Typography>
                    <CardMedia
                      component="img"
                      image={(query.id === "agriculture" ? agriculture : query.id === "food" ? food : gardening)[Cookies.get("random") === "false" ? data.quize_size : String(quize[query.id][Number(data.quize_size) - 1])].image}
                      alt="画像"
                      style={{ width: isSmallScreen ? isverySmallScreen ? "200px" : "300px" : '550px' }}
                    /></> : ""}

                <Typography
                  sx={{ textAlign: "right", color: "gray", fontSize: 10 }}
                >
                  問題ID:
                  {Cookies.get("random") === "false"
                    ? data.quize_size || "読み込み失敗"
                    : quize[query.id][Number(data.quize_size - 1)] ||
                    "読み込み失敗"}
                  <br />
                  経過時間:
                  {minutes === 0 ? "" : minutes + "分"}
                  {seconds}秒
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                    mt: 2,
                  }}
                >
                  <TextField
                    inputRef={ref}
                    label="回答を入力してください"
                    value={text}
                    onChange={handleChange}
                    onKeyDown={click_answer}
                    fullWidth
                  />
                  {(Cookies.get("20change") || "false") === "false" && (
                    <Button
                      variant="contained"
                      sx={{ width: "100px", height: "55px", fontSize: 20 }}
                      onClick={click_answer}
                    >
                      回答
                    </Button>
                  )}
                </Box>
              </>)
          )
          }
        </Box>
      </Box >
    </>
  );
};

export default Work;

import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import StarHalfOutlinedIcon from "@mui/icons-material/StarHalfOutlined";
import Barchart from "../../components/chart/Barchart";
import Piechart from "../../components/chart/Piechart";
import RecentOrders from "../../components/table/RecentOrders";
import api from "../../api/Request";
import moment from "moment";
import { formatCurrency, limitString } from "../../utils/Convert";

const BoxCard = ({ children, nameCard, total, today, thisMonth }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        boxShadow: "rgba(145, 158, 171, 0.16) 0px 4px 8px 0px",
        borderRadius: "12px",
      }}
    >
      <Box
        sx={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid #979da51a",
        }}
      >
        <Box>
          <Typography
            sx={{
              textTransform: "uppercase",
              fontSize: "12px",
              color: "#0E22385A",
              marginBottom: "8px",
            }}
            variant="h5"
          >
            {nameCard}
          </Typography>
          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#000",
              textTransform: "lowercase",
            }}
            variant="h2"
          >
            {total}
          </Typography>
        </Box>
        <Box>{children}</Box>
      </Box>
      <Box
        sx={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              textTransform: "uppercase",
              fontSize: "10px",
              color: "#0E22385A",
            }}
          >
            Hôm nay
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#000",
            }}
          >
            {today}
          </Typography>
        </Box>
        <Box sx={{ textAlign: "end" }}>
          <Typography
            sx={{
              textTransform: "uppercase",
              fontSize: "10px",
              color: "#0E22385A",
            }}
          >
            tháng này
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#000",
            }}
          >
            {thisMonth}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const Home = () => {
  const getMonth = (curentMonth) => {
    const months = [];
    for (let i = 0; i < 6; i++) {
      if (curentMonth - i < 1) {
        months.unshift(curentMonth - i + 12);
        continue;
      }
      months.unshift(curentMonth - i);
    }
    return months;
  };
  const theme = useTheme();
  const [customer, setCustomer] = useState({
    total: 0,
    today: 0,
    thisMonth: 0,
  });
  const [orderCount, setOrderCount] = useState({
    total: 0,
    today: 0,
    thisMonth: 0,
  });
  const [revenue, setRevenue] = useState({
    total: 0,
    today: 0,
    thisMonth: 0,
  });
  const months = getMonth(moment(Date.now()).format("MM"));
  const [dataBarchart, setDataBarchart] = useState(() => {
    const labels = months.map((item) => `Tháng ${item}`);
    return { labels, data: [] };
  });
  const [dataPiechart, setDataPiechart] = useState({
    labels: [],
    data: [],
  });
  useEffect(() => {
    // total
    api.get(`/user/get-all?role=3`).then((res) => {
      setCustomer((prev) => {
        const newValue = { ...prev };
        newValue.total = res.data.total;
        return newValue;
      });
    });

    api.get(`/order/get-count`).then((res) => {
      setOrderCount((prev) => {
        const newValue = { ...prev };
        newValue.total = res.data.total;
        return newValue;
      });
    });

    api.get(`/order/get-revenue`).then((res) => {
      setRevenue((prev) => {
        const newValue = { ...prev };
        newValue.total = res.data.total;
        return newValue;
      });
    });

    // today
    const today = moment(Date.now()).format("DD-MM-YYYY");
    api.get(`/user/get-all?role=3&date=${today}`).then((res) => {
      setCustomer((prev) => {
        const newValue = { ...prev };
        newValue.today = res.data.total;
        return newValue;
      });
    });

    api.get(`/order/get-count?date=${today}`).then((res) => {
      setOrderCount((prev) => {
        const newValue = { ...prev };
        newValue.today = res.data.total;
        return newValue;
      });
    });

    api.get(`/order/get-revenue?date=${today}`).then((res) => {
      setRevenue((prev) => {
        const newValue = { ...prev };
        newValue.today = res.data.total;
        return newValue;
      });
    });

    // this month
    const thisMonth = moment(Date.now()).format("MM");
    api.get(`/user/get-all?role=3&month=${thisMonth}`).then((res) => {
      setCustomer((prev) => {
        const newValue = { ...prev };
        newValue.thisMonth = res.data.total;
        return newValue;
      });
    });

    api.get(`/order/get-count?month=${thisMonth}`).then((res) => {
      setOrderCount((prev) => {
        const newValue = { ...prev };
        newValue.thisMonth = res.data.total;
        return newValue;
      });
    });

    api.get(`/order/get-revenue?month=${thisMonth}`).then((res) => {
      setRevenue((prev) => {
        const newValue = { ...prev };
        newValue.thisMonth = res.data.total;
        return newValue;
      });
    });
  }, []);
  useEffect(() => {
    api
      .get(
        `/order/get-revenue?month=${months
          .map((item) => "0" + item)
          .toString()}`
      )
      .then((res) => {
        setDataBarchart((prev) => {
          const newValue = { ...prev };
          newValue.data = res.data.total;
          return newValue;
        });
      });

    api.get(`/product/best-seller`).then((res) => {
      const labels = [];
      const data = [];
      res.data.data.map((item) => {
        labels.push(limitString(item.nameProduct, 34));
        data.push(item.totalSold);
      });
      setDataPiechart({ labels, data });
    });
  }, []);
  return (
    <Box
      sx={{
        marginBottom: "80px",
        padding: "30px 40px",
        transition: theme.transitions.create(["all"], {
          easing: theme.transitions.easing.sharp,
          duration: 300,
        }),
        [theme.breakpoints.down("lg")]: {
          padding: "30px 16px",
          marginBottom: "70px",
        },
        [theme.breakpoints.down("md")]: {
          marginTop: "70px",
          marginBottom: "0",
        },
        [theme.breakpoints.down("sm")]: {
          marginBottom: "0",
        },
      }}
    >
      {/* card */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "32px",

          [theme.breakpoints.down("lg")]: {
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          },
          [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
          },
        }}
      >
        <BoxCard
          nameCard="Khách hàng"
          total={customer.total}
          today={customer.today}
          thisMonth={customer.thisMonth}
        >
          <PeopleOutlineIcon fontSize="large" color="warning" />
        </BoxCard>
        <BoxCard
          nameCard="Đơn hàng"
          total={orderCount.total}
          today={orderCount.today}
          thisMonth={orderCount.thisMonth}
        >
          <ShoppingCartOutlinedIcon fontSize="large" color="warning" />
        </BoxCard>
        <BoxCard
          nameCard="Doanh số"
          total={formatCurrency(revenue.total)}
          today={formatCurrency(revenue.today)}
          thisMonth={formatCurrency(revenue.thisMonth)}
        >
          <PaidOutlinedIcon fontSize="large" color="warning" />
        </BoxCard>
        <BoxCard
          nameCard="Đánh giá"
          total={orderCount.total}
          today={orderCount.today}
          thisMonth={orderCount.thisMonth}
        >
          <StarHalfOutlinedIcon fontSize="large" color="warning" />
        </BoxCard>
      </Box>

      {/* chart */}
      <Box
        sx={{
          marginTop: 4,
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "30px",
          [theme.breakpoints.down("lg")]: {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <Box
          sx={{
            boxShadow: "rgba(145, 158, 171, 0.16) 0px 4px 8px 0px",
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <Typography
        variant="h6"
        sx={{
          marginBottom: "12px",
          fontWeight: 600,
        }}
      >
        Doanh số 6 tháng gần nhất
      </Typography>
          
          <Barchart
            labels={dataBarchart.labels}
            dataChart={dataBarchart.data}
          />
        </Box>

        <Box
          sx={{
            boxShadow: "rgba(145, 158, 171, 0.16) 0px 4px 8px 0px",
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "20px",
            width: "100%",
          }}
        >
          <Typography
        variant="h6"
        sx={{
          marginBottom: "12px",
          fontWeight: 600,
        }}
      >
       Top 5 sản phẩm bán chạy
      </Typography>
          
          <Box
            sx={{
              width: "90%",
              margin: "auto",
              position: "relative",
              top: "50%",
              transform: "translateY(-50%)",
              [theme.breakpoints.down("lg")]: {
                width: "40%",
              },
              [theme.breakpoints.down("md")]: {
                width: "50%",
              },
              [theme.breakpoints.down("sm")]: {
                width: "80%",
              },
            }}
          >
            <Piechart
              labels={dataPiechart.labels}
              dataChart={dataPiechart.data}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          boxShadow: "rgba(145, 158, 171, 0.16) 0px 4px 8px 0px",
          marginTop: 4,
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "20px",
          width: "100%",
        }}
      >
        <RecentOrders />
      </Box>
    </Box>
  );
};

export default Home;

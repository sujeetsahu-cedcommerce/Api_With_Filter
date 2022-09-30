import {
  Button,
  Card,
  DataTable,
  Grid,
  Heading,
  Icon,
  Page,
  Pagination,
  Select,
  Spinner,
  Stack,
  Text,
  TextField,
} from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import "./DashboardStyle.css";

const Dashboard = () => {
  const [arr, setArr] = useState([]);
  const [selected, setSelected] = useState("5");
  const [activePagee, setActivePage] = useState(1);
  const [totalResult, setTotalResult] = useState(0);
  const [flag, setFlag] = useState(false);
  const [filterSelected, setFilterSelected] = useState(false);

  const [selectedValue, setSelectedValue] = useState();
  const [inputValue, setInputValue] = useState();
  const [filterType, setfilterType] = useState("");

  const [selectArr, setSelectArr] = useState([]);
  const [inputArr, setInputArr] = useState([]);

  const url = new URL(
    "https://fbapi.sellernext.com/frontend/admin/getAllUsers"
  );
  let item = { activePage: activePagee, count: selected };
  for (let i in item) {
    url.searchParams.append(i, item[i]);
  }

  useEffect(() => {
    fetch(url, {
      headers: {
        Accept: "Application/json",
        authorization: `Bearer ${sessionStorage.getItem("myData")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.data.rows);
        console.log(data.data.rows.length);
        data.data.rows.length > 0 ? setFlag(true) : setFlag(false);
        setArr(data.data.rows);
        setTotalResult(data.data.count);
      });
  }, []);

  const handleSelectChange = useCallback((value) => {
    setSelected(value);
    alert();
  }, []);

  useEffect(() => {
    if (inputValue && selectedValue) {
      filterSelected ? (
        setTimeout(() => {
          Filter();
        }, 5000)
      ) : (
        <></>
      );
    }
  }, [selectedValue, inputValue]);

  const Filter = () => {
    let item = { activePage: activePagee, count: selected };
    for (let i in item) {
      url.searchParams.append(i, item[i]);
    }

    fetch(
      `https://fbapi.sellernext.com/frontend/admin/getAllUsers?activePage=${activePagee}&count=${selected}&filter[${filterType}][${selectedValue}]=${inputValue}`,
      {
        headers: {
          Accept: "Application/json",
          authorization: `Bearer ${sessionStorage.getItem("myData")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // console.log(data.data.rows);
        data.data.rows.length > 0 ? setFlag(true) : setFlag(false);
        setArr(data.data.rows);
        setTotalResult(data.data.count);
      });
  };

  const options = [
    { label: "5", value: "5" },
    { label: "10", value: "10" },
    { label: "20", value: "20" },
    { label: "30", value: "30" },
    { label: "40", value: "40" },
    { label: "50", value: "50" },
    { label: "60", value: "60" },
  ];

  const filterOptions = [
    { label: "Equals", value: "1" },
    { label: "Not Equals", value: "2" },
    { label: "Contains", value: "3" },
    { label: "Does Not Contains", value: "4" },
    { label: "Starts With", value: "5" },
    { label: "Ends With", value: "6" },
  ];

  const rows = arr.map(myfunction);

  function myfunction(item) {
    return [
      item.user_id,
      item.catalog,
      item.username,
      item.email,
      item.shopify_plan,
      item.updated_at,
      item.created_at,
      item.shop_url,
    ];
  }

  const getSelectedValue = (value, item, index) => {
    let temp = [...selectArr];
    temp[index] = value;
    setSelectArr(temp);
    setSelectedValue(value);
    console.log(value);
    console.log(item);
    setfilterType(item);
    setFilterSelected(true);
  };

  const getInputValue = (value, item, index) => {
    let temp = [...inputArr];
    temp[index] = value;
    setInputArr(temp);
    setInputValue(value);
    console.log(value);
    console.log(item);
    setfilterType(item);
    setFilterSelected(true);
  };

  const arr1 = [
    "user_id",
    "catalog",
    "username",
    "shops.email",
    "shopify_plan",
    "updated_at",
    "created_at",
    "shop_url",
  ].map((item, index) => {
    return (
      <div>
        <Select
          labelInline
          options={filterOptions}
          onChange={(e) => getSelectedValue(e, item, index)}
          value={selectArr[index]}
        />
        <TextField
          onChange={(e) => getInputValue(e, item, index)}
          value={inputArr[index]}
          placeholder={item}
          autoComplete="off"
        />
      </div>
    );
  });

  const alldata = [arr1, ...rows];

  return (
    <>
      <Page fullWidth>
        {flag ? (
          <Heading>
            Showing from {1 + (activePagee - 1) * selected}
            to {activePagee * selected} of {totalResult} users
          </Heading>
        ) : (
          <Heading>
            Showing from {1 + (activePagee - 1) * selected}
            to {activePagee * selected} ...Loading from {totalResult} users
          </Heading>
        )}

        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 6, lg: 6, xl: 6 }}>
            <Card title="" sectioned>
              <div className="upperContainer">
                <div>
                  <div className="leftUpperContainer">
                    <div>
                      <Pagination
                        label={activePagee}
                        hasPrevious
                        onPrevious={() => {
                          setActivePage(activePagee - 1);
                          console.log("Previous", activePagee);
                          setFlag(false);
                        }}
                        hasNext
                        onNext={() => {
                          setActivePage(activePagee + 1);
                          console.log("next", activePagee);
                          setFlag(false);
                        }}
                      />
                    </div>

                    <Select
                      label="Row per page"
                      labelInline
                      options={options}
                      onChange={handleSelectChange}
                      value={selected}
                    />
                  </div>
                </div>

                <div>
                  <Button primary>View Columns</Button>
                </div>
              </div>
            </Card>
          </Grid.Cell>

          <>
            {flag ? (
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 6, lg: 6, xl: 6 }}>
                <Card>
                  <DataTable
                    columnContentTypes={[
                      "text",
                      "numeric",
                      "numeric",
                      "numeric",
                      "numeric",
                    ]}
                    headings={[
                      <p style={{ fontWeight: "bold" }}>UserId</p>,
                      <p style={{ fontWeight: "bold" }}>Catalog</p>,
                      <p style={{ fontWeight: "bold" }}>Shop domain</p>,
                      <p style={{ fontWeight: "bold" }}>Shop email</p>,
                      <p style={{ fontWeight: "bold" }}>Shop Plan name</p>,
                      <p style={{ fontWeight: "bold" }}>Updated at</p>,
                      <p style={{ fontWeight: "bold" }}>Created at</p>,
                      <p style={{ fontWeight: "bold" }}>
                        Shops myshopify domain
                      </p>,
                    ]}
                    rows={alldata}
                    // totals={arr1}
                  />
                </Card>
              </Grid.Cell>
            ) : (
              <div className="spinner">
                <Spinner accessibilityLabel="Spinner example" size="large" />
              </div>
            )}
          </>
        </Grid>
      </Page>
    </>
  );
};

export default Dashboard;

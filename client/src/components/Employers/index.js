import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import useStyles from "./styles";
import PopularEmployerCard from "./PopularEmployerCard";
import Intro from "./Intro";
import SearchResult from "./SearchResult";
import { useLocation, useNavigate } from "react-router-dom";

const Employers = () => {
  const classes = useStyles();

  const [searchTerm, setSearchTerm] = useState("");

  const sectors = ["All", "Government", "Private"];
  const [sector, setSector] = useState("All");

  const [popularEmployersData, setPopularEmployersData] = useState([]);
  const [filteredEmployerData, setFilteredEmployerData] = useState([]);

  const popularEmployersBox = useRef();
  const searchResultsBox = useRef();

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [paginationArrayLength, setPaginationArrayLength] = useState(0);

  const searchHandler = async (e) => {
    e.preventDefault();
    setPage(1);
    setLoading(true);
    popularEmployersBox.current.style.display = "none";
    searchResultsBox.current.style.display = "block";
    const filteredData = await filterEmployerData(searchTerm);
    setFilteredEmployerData(filteredData);
    setLoading(false);
  };

  const paginate = async () => {
    setFilteredEmployerData([]);
    setLoading(true);
    const filteredData = await filterEmployerData(searchTerm);
    setFilteredEmployerData(filteredData);
    setLoading(false);
  };

  const getPopularEmployersData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        // cannot sort based on rating as its a virtual, now sorted based on no. of applications the employer receives
        "http://localhost:2900/api/employers?sort=totalReceivedApplications&order=desc&limit=6"
      );
      const data = await response.data.employers;
      console.log(response);
      setPopularEmployersData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const filterEmployerData = async (searchTerm) => {
    let response;
    if (searchTerm === "") {
      if (sector === "All") {
        response = await axios.get(
          `http://localhost:2900/api/employers?sort=companyName&order=asc&page=${page}`
        );
      } else if (sector === "Government") {
        response = await axios.get(
          `http://localhost:2900/api/employers?sector=Government&sort=companyName&order=asc&page=${page}`
        );
      } else if (sector === "Private") {
        response = await axios.get(
          `http://localhost:2900/api/employers?sector=Private&sort=companyName&order=asc&page=${page}`
        );
      }
      console.log("check", response);
      setPaginationArrayLength(response.headers["total-doc-count"]);
      const data = await response.data.employers;
      return data;
    } else {
      response = await axios.get(
        `http://localhost:2900/api/employers/search?term=${searchTerm}`
      );
      setPaginationArrayLength(response.headers["total-doc-count"]);
      let employersArray = await response.data.employers;
      const filteredArray = employersArray.filter((employer) => {
        if (sector === "All") {
          if (
            employer.companyName
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          ) {
            return true;
          }
          return false;
        } else if (sector !== "All") {
          if (
            employer.companyName
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) &&
            employer.sector === sector
          ) {
            return true;
          }
          return false;
        }
        return false;
      });
      setPaginationArrayLength(filteredArray.length);
      return filteredArray;
    }
  };

  useEffect(() => {
    getPopularEmployersData();
  }, []);

  useEffect(() => {
    paginate();
  }, [page]);

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box className={classes.section}>
      <Box className={classes.container}>
        <Intro />
        <form className={classes.searchControls} onSubmit={searchHandler}>
          <TextField
            name="searchTerm"
            type="text"
            label="Find Employers"
            variant="outlined"
            sx={{ flexGrow: 1 }}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              popularEmployersBox.current.style.display = "block";
              searchResultsBox.current.style.display = "none";
            }}
          />
          <TextField
            name="sector"
            type="text"
            select
            label="Sector"
            variant="outlined"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            sx={{ flexGrow: 1, flexBasis: 220 }}
          >
            {sectors.map((sector) => (
              <MenuItem key={sector} value={sector}>
                {sector}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disableElevation
            className={classes.button}
          >
            Find Employer
          </Button>
        </form>

        <Box className={classes.popularEmployersBox} ref={popularEmployersBox}>
          <Typography variant="h6" mt={3}>
            Popular Employers{" "}
          </Typography>
          <Typography variant="caption">(by applications received)</Typography>
          <Box
            className={classes.popularEmployers}
            sx={{ display: "flex", flexWrap: "wrap" }}
          >
            {/* {loading && <CircularProgress color="secondary" sx={{ m: 2 }} />} */}
            {popularEmployersData.length !== 0
              ? popularEmployersData.map((emp) => (
                  <PopularEmployerCard
                    key={emp.id}
                    employer={emp}
                    onClick={() => navigate(`${location.pathname}/${emp.id}`)}
                  />
                ))
              : "No employers registered."}
          </Box>
        </Box>

        <Box
          className={classes.searchResultsBox}
          ref={searchResultsBox}
          sx={{ display: "none" }}
        >
          <Typography variant="h6" mt={3} mb={1}>
            Search results for "{searchTerm}"
          </Typography>
          <Box
            className={classes.searchResults}
            sx={{ display: "flex", flexDirection: "column", gap: 1 }}
          >
            {loading ? (
              <CircularProgress color="secondary" sx={{ m: 2 }} />
            ) : filteredEmployerData.length !== 0 ? (
              filteredEmployerData.map((employer) => (
                <SearchResult
                  employer={employer}
                  key={employer._id}
                  onClick={() =>
                    navigate(`${location.pathname}/${employer._id}`)
                  }
                />
              ))
            ) : (
              "No results found."
            )}
          </Box>
          <Pagination
            sx={{ my: 2, display: paginationArrayLength <= 10 && "none" }}
            count={Math.ceil(parseInt(paginationArrayLength) / 10)}
            page={page}
            boundaryCount={1}
            onChange={(e, selectedPage) => setPage(selectedPage)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Employers;

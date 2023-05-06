import { IconButton, InputBase, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CardPokemon from "./CardPokemon";
import { motion } from "framer-motion";
import { useGetPokemonInfo } from "../hooks/PokemonContext";
import { types } from "../data/allTypes";

const container = {
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Pokemon = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [error, setError] = useState("");
  const [filterPokemon, setFilterPokemon] = useState([]);
  const setPokemonInfo = useGetPokemonInfo();

  const getAllPokemons = async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=300");
    const data = await res.json();
    async function createPokemon(results) {
      const _temp = [];
      results.forEach(async (pokemon) => {
        const res = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
        _temp.push(res);
      });
      const values = await Promise.all(
        _temp.map(async (url) => {
          const resp = await fetch(url);
          return await resp.json();
        })
      );
      setAllPokemons(values);
      setPokemonInfo(values);
    }
    createPokemon(data.results);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  useEffect(() => {
    if (filter !== "") {
      const _temp = [];
      allPokemons.forEach((item) => {
        if (item.name.includes(filter)) {
          _temp.push(item);
        }
      });
      if (_temp.length === 0) {
        setError(`Do not have Pokemon with name ${filter}`);
      } else {
        setError("");
      }
      setFilterPokemon(_temp);
    } else {
      setError("");
      setFilterPokemon([]);
    }
  }, [filter]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setFilter(query.toLowerCase());
    }
  };

  const handleClickType = (e, type) => {
    e.preventDefault();
    const _temp = [];
    if (type === "Reset") {
      setFilterPokemon([]);
    } else {
      allPokemons.forEach((data) => {
        data.types.forEach((item) => {
          if (item.type.name.toLowerCase() === type.toLowerCase()) {
            _temp.push(data);
          }
        });
      });
      setFilterPokemon(_temp);
    }
  };

  return (
    <>
      <div className="w-full py-12 px-10 lg:px-20">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            fullWidth
            value={query}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="Search Name"
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      <div className="w-full flex justify-end items-center px-10 lg:px-20 py-0">
        <h3 className="text-[14px] font-[500]">
          Count{" "}
          {filterPokemon.length !== 0
            ? filterPokemon.length
            : allPokemons.length}
        </h3>
      </div>
      <div className="w-full flex justify-start items-start gap-4 flex-col px-10 lg:px-20">
        <h3 className="text-xl font-[700]">Filter by type:</h3>
        <div className="flex gap-4 flex-wrap w-full sm:w-[90%] lg:w-[70%]">
          {types.map((type) => (
            <div
              style={{ backgroundColor: type.color }}
              key={type.id}
              onClick={(e) => handleClickType(e, type.type)}
              className={`py-1 px-4 text-[12px] text-white rounded-full cursor-pointer`}
            >
              {type.type}
            </div>
          ))}
        </div>
      </div>
      {error !== "" ? (
        <h3 className="w-full text-center text-2xl">{error}</h3>
      ) : allPokemons.length === 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-10 w-full py-12 px-10 lg:px-20"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {Array(4)
            .fill()
            .map((_, index) => (
              <motion.div
                key={index}
                variants={item}
                className="col-span-1 animate-pulse shadow-sm"
              >
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "400px",
                  }}
                ></Paper>
              </motion.div>
            ))}
        </motion.div>
      ) : (
        <>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-10 w-full py-12 px-10 lg:px-20"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filterPokemon.length !== 0
              ? filterPokemon.map((data, i) => (
                  <motion.div key={i} variants={item} className="col-span-1">
                    <CardPokemon data={data} />
                  </motion.div>
                ))
              : allPokemons.map((data, i) => (
                  <motion.div key={i} variants={item} className="col-span-1">
                    <CardPokemon data={data} />
                  </motion.div>
                ))}
          </motion.div>
        </>
      )}
    </>
  );
};

export default Pokemon;

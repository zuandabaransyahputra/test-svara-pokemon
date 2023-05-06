import { Paper } from "@mui/material";
import React from "react";

const CardPokemon = ({ data }) => {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        minHeight: "400px",
      }}
    >
      <div className="flex flex-col justify-center items-center gap-4">
        <img
          src={`${data?.sprites?.front_default}`}
          className="h-[150px] bg-cover"
          alt={`${data.name}`}
        />
        <h3 className="text-xl font-[700] text-stone-800 uppercase">
          {data.name}
        </h3>
        <div className="flex justify-evenly items-center gap-4">
          <div className="border-r-2 pr-4 flex items-center justify-center flex-col gap-2">
            <h3 className="text-[14px] font-[500]">Weight</h3>
            <h3 className="text-[12px] font-[400]">{data.weight}Kg</h3>
          </div>
          <div className="flex items-center justify-center flex-col gap-2">
            <h3 className="text-[14px] font-[500]">Height</h3>
            <h3 className="text-[12px] font-[400]">{data.height}m</h3>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <h3 className="text-[14px] font-[500]">Types</h3>
          <div className="flex justify-evenly gap-4">
            {data?.types?.map((type, i) => (
              <h3 key={i} className="text-[14px] font-[500] uppercase">
                {type.type.name}
              </h3>
            ))}
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default CardPokemon;

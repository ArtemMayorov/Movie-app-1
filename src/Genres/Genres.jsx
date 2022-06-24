import React from "react";
import { Tag } from "antd";

import { ServiceConsumer } from "../MoviesService/MoviesServiceContext";
const Genres = (props) => {
  return (
    <ServiceConsumer>
      {(consumer) => {
        if (props.genreIds && consumer) {
          return consumer.map(({ id, name }) => {
            if (props.genreIds.find((genreId) => genreId === id)) {
              return (
                <Tag key={id} className="card-genre">
                  <span className="card-genre-text">{name}</span>
                </Tag>
              );
            }
          });
        }
      }}
    </ServiceConsumer>
  );
};
export default Genres;

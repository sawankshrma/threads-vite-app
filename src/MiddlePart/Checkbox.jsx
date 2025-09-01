import { React, useState, useEffect } from "react";
import styled from "styled-components";

const Button = ({ id, onToggle, likes, likeIsOn, fetchDone }) => {
  const [originalLike, setOriginal] = useState(likeIsOn);

  useEffect(() => {
    setOriginal(fetchDone);
  }, [fetchDone]);

  // console.log(
  //   `originalLike = ${originalLike} for ${id} and likeIsOn = ${likeIsOn}`
  // );

  return (
    <StyledWrapper>
      <div className="like-button">
        <input
          className="on"
          id={id}
          type="checkbox"
          style={{ display: "none" }}
          checked={likeIsOn}
          onChange={(e) => onToggle?.(e.target.checked)}
        />
        <label className="like" htmlFor={id}>
          <svg
            className="like-icon"
            fillRule="nonzero"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
        </label>

        <span className="like-count one">
          {originalLike ? likes - 1 : likes}
        </span>
        <span className="like-count two">
          {originalLike ? likes : likes + 1}
        </span>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  #heart {
    display: none;
  }

  .like-button {
    pointer-events: auto; /* keep it clickable */
    user-select: none; /* prevent text selection */
    position: relative;
    cursor: pointer;
    display: flex;
    height: 40px; /* smaller height */
    width: 100px; /* smaller width */
    border-radius: 9999px; /* full pill shape */
    border: none;
    background-color: transparent;
    overflow: hidden;
    box-shadow: inset -1px -1px 3px rgba(255, 255, 255, 0.15),
      inset 1px 1px 3px rgba(0, 0, 0, 0.15), 2px 2px 6px rgba(0, 0, 0, 0.3),
      -1px -1px 4px rgba(255, 255, 255, 0.08);
  }

  .like {
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px; /* tighter spacing */
    cursor: pointer;
  }

  .like-icon {
    fill: #505050;
    height: 25px; /* smaller heart */
    width: 25px;
    transition: fill 0.2s ease;
  }

  .like-count {
    position: absolute;
    right: 0;
    cursor: default;
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: left;
    padding-left: 7px;
    align-items: center;
    color: #717070;
    font-size: 13px;
    font-family: "Poppins", sans-serif;
    border-left: 1px solid #3a3a3a;
    transition: all 0.3s ease-out;
    background-color: #1b1b1bff;
  }

  .like-count.two {
    transform: translateY(30px);
  }

  .on:checked ~ .like .like-icon {
    fill: #fc4e4e;
    animation: enlarge 0.2s ease-out 1;
  }

  .on:checked ~ .like-count.two {
    transform: translateX(0);
    color: #fcfcfc;
  }

  .on:checked ~ .like-count.one {
    transform: translateY(-30px);
  }

  @keyframes enlarge {
    0% {
      transform: scale(0.6);
    }
    100% {
      transform: scale(1.5);
    }
  }
`;

export default Button;

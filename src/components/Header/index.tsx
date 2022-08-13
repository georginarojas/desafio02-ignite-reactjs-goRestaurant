import React from "react";
import { Container } from "./styles";
import { FiPlusSquare } from "react-icons/fi";

import logoImg from "../../assets/logo.svg";

interface HeaderProps {
  openModal: () => void;
}

export function Header({ openModal }: HeaderProps) {
  return (
    <Container>
      <header>
        <img src={logoImg} alt="GoRestaurant" />
        <nav>
          <div>
            <button type="button" onClick={openModal} data-testid="button-add-food">
              <div className="text">Novo prato</div>
              <div className="icon">
                <FiPlusSquare size={24} />
              </div>
            </button>
          </div>
        </nav>
      </header>
    </Container>
  );
}

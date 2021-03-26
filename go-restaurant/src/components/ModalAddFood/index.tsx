import React, { useRef } from "react";
import { Input } from "../Input";
import { Modal } from "../Modal";
import { Form } from "./styles";
import { FiCheckSquare } from "react-icons/fi";

interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

export function ModalAddFood({ isOpen, setIsOpen }: ModalAddFoodProps) {
  const formRef = useRef(null);

  function handleSubmit() {}

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />
        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />
        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}

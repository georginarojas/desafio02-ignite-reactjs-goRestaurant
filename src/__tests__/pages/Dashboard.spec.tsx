import { render, fireEvent, RenderResult, waitFor } from "@testing-library/react";
// import userEvent from '@testing-library/user-event'
import Dashboard from "../../pages/Dashboard";
import { useFoods } from "../../hooks/useFoods";
import { mockFood, mockNewFood } from "../../mock/mock";


const mockedAddFood = jest.fn();
const mockedDeleteFood = jest.fn();
const mockedUpdateFood = jest.fn();
const mockedToggleAvailable = jest.fn();
const mockedUseFoodsHook = useFoods as jest.Mock;

jest.mock("../../hooks/useFoods")

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Dashboard />)
  return {
    sut
  }
}

describe("Dashboard page", () => {
  beforeEach(() => {
    mockedUseFoodsHook.mockReturnValue({
      foods: mockFood,
      addFood: mockedAddFood,
      deleteFood: mockedDeleteFood,
      updateFood: mockedUpdateFood,
      toggleAvailable: mockedToggleAvailable
    })
  })
  it("should be able to show the food card", async () => {
    const { sut } = makeSut()
    const foodDivElements = await sut.findAllByTestId("food-box");
    expect(foodDivElements.length).toBe(3);
  });

  it("should open modal addFood when clicking on add food button", () => {
    const { sut } = makeSut()
    const addFoodButtonElement = sut.getByTestId("button-add-food");
    fireEvent.click(addFoodButtonElement);
    expect(sut.getByTestId("header-modal-add")).toBeTruthy();
  });

  it("should call addFood function with correct fields", () => {
    const { sut } = makeSut()
    const addFoodButtonElement = sut.getByTestId("button-add-food");
    fireEvent.click(addFoodButtonElement);

    const populateImageField = sut.getByTestId("image") 
    fireEvent.input(populateImageField, {target: {value: mockNewFood.image}})

    const populateDescriptionField = sut.getByTestId("description")
    fireEvent.input(populateDescriptionField, {target: {value: mockNewFood.description}})

    const populateNameField = sut.getByTestId("name")
    fireEvent.input(populateNameField, {target: {value: mockNewFood.name}})

    const populatePriceField = sut.getByTestId("price")
    fireEvent.input(populatePriceField, {target: {value: mockNewFood.price}})

    const addPlateButtonElement = sut.getByTestId("add-plate-button");
    fireEvent.click(addPlateButtonElement);
    const price  = mockNewFood.price.toString() as string;
    expect(mockedAddFood).toHaveBeenCalledWith({
      image: mockNewFood.image,
      description: mockNewFood.description,
      name: mockNewFood.name,
      price: price
    })
  });

  it("should add new plate to the Dashboard", async () => {
    const { sut } = makeSut()

    const newList = [...mockFood, mockNewFood]
    mockedUseFoodsHook.mockReturnValueOnce({
      foods: newList
    })

    sut.rerender(< Dashboard/>)
    const foodDivElements = await sut.findAllByTestId("food-box");
    expect(foodDivElements.length).toBe(4);
    expect(foodDivElements[3]).toHaveTextContent(mockNewFood.name);
  });

  it("should call deleteFood function with correct value", async () => {
    const { sut } = makeSut()
    const id = 1
    const deleteFoodButtonElement = sut.getAllByTestId(`edit-food-${id}`);
    fireEvent.click(deleteFoodButtonElement[1]);

    expect(mockedDeleteFood).toHaveBeenCalledWith(id)
  });

  it("should delete food from the Dashboard", async () => {
    const { sut } = makeSut()
    const id = 1
    const deleteFoodButtonElement = sut.getAllByTestId(`edit-food-${id}`);
    fireEvent.click(deleteFoodButtonElement[1]);
   
    const newList = mockFood.filter((food) => food.id !== id)
    mockedUseFoodsHook.mockReturnValueOnce({
      foods: newList
    })

    sut.rerender(< Dashboard/>)
    const foodDivElements = await sut.findAllByTestId("food-box");
    expect(foodDivElements.length).toBe(2);
    expect(deleteFoodButtonElement[0]).not.toBeInTheDocument()
  });

  it("should send to editFood modal the correct values", async () => {
    const { sut } = makeSut()
    const id = 1
    const editFoodButtonElement = sut.getAllByTestId(`edit-food-${id}`);
    fireEvent.click(editFoodButtonElement[0]);
    expect(sut.getByTestId('header-edit-food')).toBeTruthy();

    const populateImageField = sut.getByTestId("image") 
    const populateDescriptionField = sut.getByTestId("description")
    const populateNameField = sut.getByTestId("name")
    const populatePriceField = sut.getByTestId("price")

    await waitFor(() => 
    {
      expect(populateImageField).toHaveValue(mockFood[0].image)
      expect(populateDescriptionField).toHaveValue(mockFood[0].description)
      expect(populateNameField).toHaveValue(mockFood[0].name)
      expect(populatePriceField).toHaveValue(mockFood[0].price.toString())
      })
  });

  it("should call updateFood with the correct values", () => {
    const { sut } = makeSut()
    const id = 1
    const editFoodButtonBox = sut.getAllByTestId(`edit-food-${id}`);
    fireEvent.click(editFoodButtonBox[0]);
    
    const newPrice = "49.90"
    const populatePriceField = sut.getByTestId("price")
    fireEvent.input(populatePriceField, {target: {value: newPrice}})

    const editFoodButtonElement = sut.getByTestId("edit-food-button")
    fireEvent.click(editFoodButtonElement)

    const incomingFood = {
      name: "Ao molho",
      description: "Macarrão ao molho branco, fughi e cheiro verde das montanhas",
      price: newPrice,
      image: "https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food1.png",
    }

    const newFood = {...mockFood[0], ...incomingFood}
    expect(mockedUpdateFood).toHaveBeenCalledWith(newFood)
  })

  it("should call toggleAvailable with correct values", () => {
    const { sut} = makeSut()
    const id =1
    const toggleInputElement = sut.getByTestId(`change-status-food-${id}`)
    fireEvent.click(toggleInputElement)
    // userEvent.type(toggleInputElement, 'a')
    expect(mockedToggleAvailable).toHaveBeenCalled()
    expect(mockedToggleAvailable).toHaveBeenCalledWith({ 
      food: mockFood[0],
      isAvailable: mockFood[0].available 
    })

  })

  it("should change availability status from a specific food", async () => {
    const { sut} = makeSut()
    const id = 2
    const toggleInputElement = sut.getByTestId(`change-status-food-${id}`)
    fireEvent.click(toggleInputElement)
    expect(mockedToggleAvailable).toHaveBeenCalled()
    const mockFoodChangeAvailability = {...mockFood[1], available : false}

    mockedUseFoodsHook.mockReturnValue({
      foods: [mockFood[0], mockFoodChangeAvailability, mockFood[2]]
    })

    sut.rerender(< Dashboard/>)
    const getTextAvailability = sut.getByTestId(`text-availability-${id}`)
    expect(getTextAvailability).toHaveTextContent('Indiponível')
  })
});

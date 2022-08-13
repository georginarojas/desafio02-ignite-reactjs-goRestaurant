import { renderHook, act } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react";
import AxiosMock from "axios-mock-adapter";
import { toast } from "react-toastify";

import { mockFood, mockNewFood } from "../../mock/mock";
import { api } from "../../services/api";
import { useFoods, FoodsProvider } from "../../hooks/useFoods";

const apiMock = new AxiosMock(api);

jest.mock("react-toastify");
const mockToastError = toast.error as jest.Mock;

describe("UseFoods hook", () => {
  beforeAll(() => {
    apiMock.onGet("foods").reply(200, mockFood);
  });
  test("should be able initialize foods with the api result", async () => {
    const { result } = renderHook(useFoods, { wrapper: FoodsProvider });

    await waitFor(
      () => {
        expect(result.current.foods).toEqual(mockFood);
      },
      { timeout: 200 }
    );
  });

  test("should be able to add a new food", async () => {
    const { result, waitForNextUpdate } = renderHook(useFoods, {
      wrapper: FoodsProvider,
    });
    await waitForNextUpdate({ timeout: 200 });

    act(() => {
      result.current.addFood(mockNewFood);
    });
    apiMock.onPost("foods", mockNewFood).reply(200, mockNewFood);

    await waitForNextUpdate({ timeout: 200 });

    const newFoods = [...mockFood, mockNewFood];

    expect(result.current.foods).toEqual(newFoods);
  });

  test("should not able to add a new food if addFood fails", async () => {
    const { result, waitForNextUpdate } = renderHook(useFoods, {
      wrapper: FoodsProvider,
    });

    apiMock.onPost("foods", mockNewFood).reply(404);

    act(() => {
      result.current.addFood(mockNewFood);
    });

    // await waitFor(
    //   () => {
    //     expect(mockToastError).toHaveBeenCalledWith( "Erro na adição de um novo prato" );
    //     expect(result.current.foods.length).toBe(3);
    //   },
    //   { timeout: 200 }
    // );

    await waitForNextUpdate({ timeout: 200 });
    expect(mockToastError).toHaveBeenCalledWith(
      "Erro na adição de um novo prato"
    );
    expect(result.current.foods.length).toBe(3);
  });

  test("should be able to remove  a food", async () => {
    const { result, waitForNextUpdate } = renderHook(useFoods, {
      wrapper: FoodsProvider,
    });
    await waitForNextUpdate({ timeout: 200 });

    const id = 1;
    result.current.deleteFood(id);
    apiMock.onDelete(`/foods/${id}`).reply(200);

    await waitForNextUpdate({ timeout: 200 });

    const newFoods = [mockFood[1], mockFood[2]];
    expect(result.current.foods).toEqual(newFoods);
  });

  test("should not be able to remove a food if deleteFood fails", async () => {
    const { result } = renderHook(useFoods, {
      wrapper: FoodsProvider,
    });

    const id = 2;
    apiMock.onDelete(`/foods/${id}`).reply(404);

    await act(async () => {
      await result.current.deleteFood(id);
    });

    expect(mockToastError).toHaveBeenCalledWith("Erro na remoção do prato");
    expect(result.current.foods.length).toBe(3);
  });

  test("should be able to update food", async () => {
    const { result, waitForNextUpdate } = renderHook(useFoods, {
      wrapper: FoodsProvider,
    });

    await waitForNextUpdate({ timeout: 200 });
    const updateFood = { ...mockFood[2], name: "Camarão ao molho" };

    act(() => {
      result.current.updateFood(updateFood);
    });
    apiMock.onPut(`/foods/${updateFood.id}`, { ...updateFood }).reply(200);
    await waitForNextUpdate({ timeout: 200 });

    const newFoods = [mockFood[0], mockFood[1], updateFood];

    expect(result.current.foods).toEqual(newFoods);
  });

  test("should not be able to update a food if updateFood fails", async () => {
    const { result } = renderHook(useFoods, {
      wrapper: FoodsProvider,
    });

    const updateFood = { ...mockFood[2], name: "Camarão ao molho" };
    apiMock.onPut(`/foods/${updateFood.id}`, { ...updateFood }).reply(404);

    await act(async () => {
      result.current.updateFood(updateFood);
    });

    expect(mockToastError).toHaveBeenCalledWith("Erro na edição do prato");
    expect(result.current.foods).toEqual(mockFood);
  });

  test("should be able to toggle availability value of the food", async () => {
    const { result, waitForNextUpdate } = renderHook(useFoods, {
      wrapper: FoodsProvider,
    });

    await waitForNextUpdate({ timeout: 200 });

    act(() => {
      result.current.toggleAvailable({
        food: mockFood[1],
        isAvailable: mockFood[1].available,
      });
    });

    const toggleFood = { ...mockFood[1], available: !mockFood[1].available };
    apiMock.onPut(`/foods/${toggleFood.id}`, toggleFood).reply(200, toggleFood);
    await waitForNextUpdate({ timeout: 200 });

    const newFoods = [mockFood[0], toggleFood, mockFood[2]];

    expect(result.current.foods[1]).toEqual(toggleFood);
    expect(result.current.foods).toEqual(newFoods);
  });

  test("should not be able to toggle available value if updateFood fails", async () => {
    const { result } = renderHook(useFoods, {
      wrapper: FoodsProvider,
    });

    const toggleFood = { ...mockFood[1], available: !mockFood[1].available };
    apiMock.onPut(`/foods/${toggleFood.id}`, toggleFood).reply(200, toggleFood);

    await act(async () => {
      result.current.toggleAvailable({
        food: mockFood[1],
        isAvailable: mockFood[1].available,
      });
    });

    expect(mockToastError).toHaveBeenCalledWith("Erro no edição do prato");
    expect(result.current.foods).toEqual(mockFood);
  });
});

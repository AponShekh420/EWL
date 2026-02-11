import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { CartModel } from "../../../models/CartModel";
import productModel from "../../../models/ProductModel";
import { IProduct } from "../../../types/ProductType";
import { catchErrorSend } from "../../../utils/catchErrorSend";
export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req?.user?._id;

    const product = (await productModel.findById(productId)) as IProduct;
    if (!product) {
      return next(createError(400, "Product not found"));
    }

    let cart = await CartModel.findOne({ customer: userId });

    if (!cart) {
      cart = new CartModel({
        customer: userId,
        items: [
          {
            product: productId,
            quantity: quantity || 1,
            price: product.salePrice,
          },
        ],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId,
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity || 1;
      } else {
        cart.items.push({
          product: productId,
          quantity: quantity || 1,
          price: product.salePrice,
        });
      }
    }
    await cart.save();

    return res.status(201).json({
      success: true,
      data: cart,
      message: "Product added to cart",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};

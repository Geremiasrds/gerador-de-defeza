import styled from "styled-components";

export const Container = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 40px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  @media (max-width: 600px) {
    padding: 20px 16px;
    margin: 20px 12px;
    gap: 16px;
  }
`;

export const Title = styled.h2`
  font-weight: 700;
  font-size: 2.4rem;
  color: #222;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 1.8rem;
  }
`;

export const Input = styled.input`
  padding: 14px 18px;
  border: 1.5px solid #d1d1d1;
  border-radius: 10px;
  font-size: 1rem;
  background-color: #fefefe;
  transition: border-color 0.3s, box-shadow 0.3s, background-color 0.4s ease;

  &:focus {
    border-color: #4caf50;
    background-color: #f4fff6;
    outline: none;
    box-shadow: 0 0 8px rgba(76, 175, 80, 0.3);
  }

  @media (max-width: 600px) {
    font-size: 0.95rem;
  }
`;

export const Textarea = styled.textarea`
  padding: 14px 18px;
  border: 1.5px solid #d1d1d1;
  border-radius: 10px;
  font-size: 1rem;
  resize: vertical;
  min-height: 140px;
  background-color: #fefefe;
  transition: border-color 0.3s, box-shadow 0.3s, background-color 0.4s ease;

  &:focus {
    border-color: #4caf50;
    background-color: #f4fff6;
    outline: none;
    box-shadow: 0 0 8px rgba(76, 175, 80, 0.3);
  }

  @media (max-width: 600px) {
    font-size: 0.95rem;
  }
`;

export const PdfContent = styled.div`
  width: 590px;
  padding: 10px 40px;
  background-color:rgb(255, 255, 255);
  border: 1px solid #ccc;
  border-radius: 10px;
  color: #222;
  font-size: 11px;
  line-height: 1.9;
  font-family: strong;
  box-sizing: border-box;
  white-space: pre-wrap;
  @media (max-width: 600px) {
    width: 350px;
  }
  
`;

export const HeaderText = styled.div`
  font-size: 0.85rem;
  color: #777;
  text-align: right;
  margin-bottom: 18px;
  font-weight: 600;
`;

export const PdfTitle = styled.h2`
  text-align: center;
  margin-bottom: 28px;
  font-weight: 700;
  font-size: 1.9rem;
  color: #2c2c2c;

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

export const Button = styled.button`
  padding: 16px 32px;
  background-color: #4caf50;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  align-self: center;
  box-shadow: 0 8px 20px rgba(76, 175, 80, 0.3);
  transition: background-color 0.25s ease, box-shadow 0.25s ease, transform 0.1s ease;

  &:hover {
    background-color: #45a049;
    box-shadow: 0 10px 25px rgba(69, 160, 73, 0.45);
  }

  &:active {
    background-color: #3a8a3c;
    box-shadow: 0 4px 10px rgba(58, 138, 60, 0.25);
    transform: scale(0.97);
  }

  @media (max-width: 600px) {
    font-size: 1rem;
    padding: 14px 28px;
    
  }
`;

export const SignatureLine = styled.div`
  border-bottom: 1px solid #000;
  width: 250px;
  height: 20px;
`;

export const SignatureText = styled.p`
  margin-top: 6px;
  text-align: center;
  font-size: 1rem;
  color: #333;
  font-style: italic;
  user-select: none;
`;

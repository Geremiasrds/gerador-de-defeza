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
    padding: 24px 20px;
    margin: 20px 15px;
  }
`;

export const Title = styled.h2`
  font-weight: 700;
  font-size: 2.4rem;
  color: #222;
  text-align: center;
  margin-bottom: 10px;
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
`;
export const PdfContent = styled.div`
  width: 595px;           /* A4 width em px a 72dpi */
  height: 842px;          /* A4 height em px a 72dpi */
  padding: 50px 40px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 10px;
  color: #222;
  font-size: 14px;
  line-height: 1.8;       /* melhora o respiro entre linhas */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  white-space: pre-wrap;
  overflow: hidden;
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
`;

export const SignatureLine = styled.div`
  border-bottom: 1px solid #000;
  width: 250px;
  margin: 30px auto 10px auto;
  height: 30px;
`;

export const SignatureText = styled.p`
  margin-top: 6px;
  text-align: center;
  font-size: 1rem;
  color: #333;
  font-style: italic;
  user-select: none;
`;

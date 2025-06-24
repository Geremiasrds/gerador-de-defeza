import styled from "styled-components";

export const Container = styled.div`
  max-width: 900px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 600px) {
    margin: 20px 15px;
    padding: 15px 20px;
  }
`;

export const Title = styled.h2`
  font-weight: 700;
  font-size: 2rem;
  color: black;
  text-align: center;
`;

export const Input = styled.input`
  padding: 14px 16px;
  margin-bottom: 12px;
  border: 1.8px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  outline-offset: 2px;

  &:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 8px rgba(76, 175, 80, 0.3);
  }
`;

export const Textarea = styled.textarea`
  padding: 14px 16px;
  margin-bottom: 20px;
  border: 1.8px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 8px rgba(76, 175, 80, 0.3);
  }
`;

export const PdfContent = styled.div`
  padding: 30px;
  background-color: #fff;
  border: 1px solid #ccc;
  max-width: 595px; /* largura A4 */
  color: black;
  white-space: pre-wrap;
  font-size: 11px;
  line-height: 1.3;
`;

export const HeaderText = styled.div`
  font-size: 0.75rem;
  color: #666;
  text-align: right;
  margin-bottom: 12px;
  font-weight: 600;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const PdfTitle = styled.h2`
  text-align: center;
  margin-bottom: 25px;
  font-weight: 700;
  font-size: 1.8rem;
  color:rgb(3, 3, 3);
`;

export const Button = styled.button`
  padding: 14px 28px;
  background-color: #4caf50;
  color: #fff;
  font-size: 1.1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  align-self: center;
  box-shadow: 0 6px 12px rgba(76, 175, 80, 0.35);
  transition: background-color 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    background-color: #45a049;
    box-shadow: 0 8px 16px rgba(69, 160, 73, 0.55);
  }

  &:active {
    background-color: #3a8a3c;
    box-shadow: none;
  }
`;

export const SignatureLine = styled.div`  
  border-bottom: 1px solid black;
  width: 250px;
  margin-left: auto;
  margin-right: auto;
  height: 30px;           /* altura para espaço em branco */
`;


export const SignatureText = styled.p`
  margin-top: 6px;
  text-align: center;
  font-size: 0.9rem;
  color: black;
  font-style: italic;
  user-select: none;
`;

CREATE MIGRATION m1fsnhxb4dwco4zgr34tynrogeynhc4joaggrzulwg5tag6zi4nzdq
    ONTO initial
{
  CREATE TYPE default::Question {
      CREATE REQUIRED PROPERTY correct_answer: std::str;
      CREATE REQUIRED PROPERTY options: array<std::str>;
      CREATE REQUIRED PROPERTY text: std::str;
  };
};

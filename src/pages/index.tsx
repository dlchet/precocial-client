import { NextPage } from "next";
import { Fragment } from "react";
import useSWR from "swr";
import { Message } from "../../Api";
import axios from "axios";

const fetcher = async (key: string): Promise<{ messages: Message[] }> => {
  /* await new Promise((r) => setTimeout(r, 9000)); */
  try {
    return {
      messages: (await axios.get<Message[]>(`http://localhost:8080/${key}`))
        .data,
    };
  } catch (error) {
    throw error;
  }
};

const Index: NextPage<{}> = (_) => {
  const { isValidating, error, data, mutate } = useSWR("messages", fetcher);
  return (
    <Fragment>
      {isValidating ? (
        "validating"
      ) : error ? (
        "error"
      ) : (
        <pre>{JSON.stringify(data.messages)}</pre>
      )}
    </Fragment>
  );
};

export default Index;

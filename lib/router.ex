defmodule Hanzi.Router do
  use Plug.Router

  # plug(Plug.Telemetry, event_prefix: [__MODULE__])

  plug(Plug.Static, at: "/static", from: "static", zip: true)
  plug(Plug.Static, at: "/doc", from: "doc", zip: true)

  plug(:match)
  plug(Plug.Logger)
  plug(:dispatch)

  get "/" do
    conn = put_resp_content_type(conn, "text/html")
    send_file(conn, 200, "static/index.html")
  end

  get "/favicon.ico" do
    conn = put_resp_content_type(conn, "image/png")
    send_file(conn, 200, "static/logo.png")
  end

  get "/pinyin/:hanzi" do
    conn = put_resp_content_type(conn, "text/plain")
    send_resp(conn, 200, Pinyin.pinyin(hanzi))
  end

  match _ do
    send_resp(conn, 404, "not found")
  end
end

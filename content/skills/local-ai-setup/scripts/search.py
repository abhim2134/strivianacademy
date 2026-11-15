#!/usr/bin/env python3
"""Private file search with a local embedding model (Mac / Linux).

Usage: python3 search.py <folder> "<question>" [embedding_model]

Embeds every .md/.txt file in <folder> with Ollama, then ranks them against the
question. Nothing leaves the computer. Standard library only.
"""
import json, os, sys, urllib.request

API = "http://localhost:11434/api/embed"


def embed(model, texts):
    body = json.dumps({"model": model, "input": texts}).encode()
    req = urllib.request.Request(API, data=body, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=300) as r:
        return json.load(r)["embeddings"]


def main():
    if len(sys.argv) < 3:
        sys.exit('usage: search.py <folder> "<question>" [embedding_model]')
    folder, question = sys.argv[1], sys.argv[2]
    model = sys.argv[3] if len(sys.argv) > 3 else "embeddinggemma"

    files = sorted(
        os.path.join(folder, f) for f in os.listdir(folder)
        if f.endswith((".md", ".txt")) and f.lower() != "readme.md"
    )
    if not files:
        sys.exit(f"no .md or .txt files in {folder}")
    texts = [open(f, encoding="utf-8").read() for f in files]

    doc_vecs = embed(model, texts)
    q_vec = embed(model, [question])[0]
    # Ollama returns unit-length vectors, so a dot product is the cosine similarity.
    scores = [sum(a * b for a, b in zip(q_vec, v)) for v in doc_vecs]

    print(f'Question: {question}\n')
    for score, f in sorted(zip(scores, files), reverse=True)[:3]:
        print(f"{score:.3f}  {os.path.basename(f)}")


if __name__ == "__main__":
    main()

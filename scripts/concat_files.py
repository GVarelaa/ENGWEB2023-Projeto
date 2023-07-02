import os
import json


def concatenate_json_files(folder_path, output_file):
    # Lista todos os arquivos na pasta fornecida
    file_list = os.listdir(folder_path)
    json_data = []
    file_list1 = [
        "jtre_acordaos.json",
        "jcon_acordaos.json",
        "jtrp_acordaos.json",
        "jsta_acordaos.json",
        "jtcn_acordaos.json",
        "jtcampc(a|t)_acordaos.json",
        "jtrc_acordaos.json",
    ]
    for key in file_list1:
        file_list.remove(key)
    # file_list = ["acordaos.json"]

    # Percorre todos os arquivos na pasta
    for file_name in file_list:
        print(file_name)
        # Verifica se o arquivo tem extensão JSON
        if file_name.endswith(".json"):
            file_path = os.path.join(folder_path, file_name)

            # Lê o conteúdo do arquivo JSON
            with open(file_path, "r") as file:
                try:
                    json_content = json.load(file)
                    json_data = json_data + json_content
                    del json_content
                except json.JSONDecodeError:
                    print(f"Erro ao ler o arquivo JSON: {file_path}")

    # Grava os dados em um único arquivo
    with open(output_file, "w", encoding="utf-8") as output:
        json.dump(json_data, output, indent=" ", ensure_ascii=False)

    print(f"Arquivos JSON concatenados no arquivo: {output_file}")


# Exemplo de uso:
pasta = "./Acordaos"
arquivo_saida = "acordaos1.json"

concatenate_json_files(pasta, arquivo_saida)

import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: true }));

const porta = 3000;
const host = 'localhost';

let empresas = [];

function cadastroEmpresaView(req, res) {
    res.send(`
        <html>
            <head>
                <title>Cadastro de Empresas</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    .container {
                        max-width: 800px;
                        margin: 50px auto;
                        background-color: #f9f9f9;
                        padding: 20px;
                        border-radius: 8px;
                    }
                    .error {
                        color: red;
                        font-size: 0.9em;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Cadastro de Empresas</h1>
                    <form method="POST" action="/cadastrar">
                        <div class="mb-3">
                            <label for="cnpj" class="form-label">CNPJ</label>
                            <input type="text" class="form-control" id="cnpj" name="cnpj" required>
                        </div>
                        <div class="mb-3">
                            <label for="razao" class="form-label">Razão Social</label>
                            <input type="text" class="form-control" id="razao" name="razao" required>
                        </div>
                        <div class="mb-3">
                            <label for="fantasia" class="form-label">Nome Fantasia</label>
                            <input type="text" class="form-control" id="fantasia" name="fantasia" required>
                        </div>
                        <div class="mb-3">
                            <label for="endereco" class="form-label">Endereço</label>
                            <input type="text" class="form-control" id="endereco" name="endereco" required>
                        </div>
                        <div class="mb-3">
                            <label for="cidade" class="form-label">Cidade</label>
                            <input type="text" class="form-control" id="cidade" name="cidade" required>
                        </div>
                        <div class="mb-3">
                            <label for="uf" class="form-label">UF</label>
                            <select class="form-select" id="uf" name="uf" required>
                                <option value="">Selecione...</option>
                                <option value="AC">AC</option>
                                <option value="AL">AL</option>
                                <option value="AP">AP</option>
                                <option value="AM">AM</option>
                                <option value="BA">BA</option>
                                <option value="CE">CE</option>
                                <option value="DF">DF</option>
                                <option value="ES">ES</option>
                                <option value="GO">GO</option>
                                <option value="MA">MA</option>
                                <option value="MT">MT</option>
                                <option value="MS">MS</option>
                                <option value="MG">MG</option>
                                <option value="PA">PA</option>
                                <option value="PB">PB</option>
                                <option value="PR">PR</option>
                                <option value="PE">PE</option>
                                <option value="PI">PI</option>
                                <option value="RJ">RJ</option>
                                <option value="RN">RN</option>
                                <option value="RS">RS</option>
                                <option value="RO">RO</option>
                                <option value="RR">RR</option>
                                <option value="SC">SC</option>
                                <option value="SP">SP</option>
                                <option value="SE">SE</option>
                                <option value="TO">TO</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="cep" class="form-label">CEP</label>
                            <input type="text" class="form-control" id="cep" name="cep" required>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" name="email" required>
                        </div>
                        <div class="mb-3">
                            <label for="telefone" class="form-label">Telefone</label>
                            <input type="text" class="form-control" id="telefone" name="telefone" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Cadastrar</button>
                    </form>
                    <hr>
                    <h2>Empresas Cadastradas</h2>
                    <ul>
                        ${empresas.map(empresa => `
                            <li>${empresa.razao} - ${empresa.cnpj} - ${empresa.email} - ${empresa.telefone}</li>
                        `).join('')}
                    </ul>
                </div>
            </body>
        </html>
    `);
}

function cadastrarEmpresa(req, res) {
    const { cnpj, razao, fantasia, endereco, cidade, uf, cep, email, telefone } = req.body;

    let errors = [];

    if (!cnpj) errors.push('CNPJ');
    if (!razao) errors.push('Razão Social');
    if (!fantasia) errors.push('Nome Fantasia');
    if (!endereco) errors.push('Endereço');
    if (!cidade) errors.push('Cidade');
    if (!uf) errors.push('UF');
    if (!cep) errors.push('CEP');
    if (!email) errors.push('Email');
    if (!telefone) errors.push('Telefone');

    if (errors.length > 0) {
        res.send(`
            <html>
                <head>
                    <title>Erro no Cadastro</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                </head>
                <body>
                    <div class="container">
                        <h1>Erro no Cadastro</h1>
                        <p>Os seguintes campos são obrigatórios:</p>
                        <ul>
                            ${errors.map(error => `<li>${error}</li>`).join('')}
                        </ul>
                        <a href="/cadastrar" class="btn btn-secondary">Voltar</a>
                    </div>
                </body>
            </html>
        `);
        return;
    }

    empresas.push({ cnpj, razao, fantasia, endereco, cidade, uf, cep, email, telefone });

    res.redirect('/cadastrar');
}

app.get('/cadastrar', cadastroEmpresaView);
app.post('/cadastrar', cadastrarEmpresa);

app.listen(porta, host, () => {
    console.log(`Servidor iniciado em http://${host}:${porta}/cadastrar`);
});

<!DOCTYPE html>
<html>
<head>
    <title>Facture Commande #{{ $order->id }}</title>
    <style>
        body { font-family: sans-serif; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #000; padding: 8px; text-align: left; }
    </style>
</head>
<body>
    <h1>Facture Commande #{{ $order->id }}</h1>
    <p>Client: {{ $order->client->nom ?? '' }} {{ $order->client->prenom ?? '' }}</p>
    <p>Date: {{ $order->created_at->format('d/m/Y H:i') }}</p>

    <h3>Plats commandés :</h3>
    <table>
        <thead>
            <tr>
                <th>Plat</th>
                <th>Quantité</th>
                <th>Prix</th>
            </tr>
        </thead>
        <tbody>
            @foreach($order->dishes as $plat)
            <tr>
                <td>{{ $plat->nom }}</td>
                <td>{{ $plat->pivot->quantite }}</td>
                <td>{{ $plat->prix }} FCFA</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <h3>Paiements :</h3>
    <table>
        <thead>
            <tr>
                <th>Montant</th>
                <th>Mode de paiement</th>
                <th>Statut</th>
            </tr>
        </thead>
        <tbody>
            @foreach($paiements as $p)
            <tr>
                <td>{{ $p->montant }} FCFA</td>
                <td>{{ $p->mode_paiement }}</td>
                <td>{{ $p->statut }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
<!DOCTYPE html>
<html>
<head>
    <title>Facture Commande #{{ $order->id }}</title>
    <style>
        body { font-family: Arial, sans-serif; font-size: 14px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        h2 { text-align: center; }
    </style>
</head>
<body>
    <h2>Facture Commande #{{ $order->id }}</h2>
    <p><strong>Client :</strong> {{ $order->client->nom ?? 'N/A' }}</p>
    <p><strong>Date :</strong> {{ $order->created_at->format('d/m/Y') }}</p>

    <table>
        <thead>
            <tr>
                <th>Plat</th>
                <th>Quantité</th>
                <th>Prix Unitaire</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach($order->dishes as $plat)
                <tr>
                    <td>{{ $plat->nom }}</td>
                    <td>{{ $plat->pivot->quantite }}</td>
                    <td>{{ number_format($plat->pivot->prix_unitaire, 2) }} €</td>
                    <td>{{ number_format($plat->pivot->quantite * $plat->pivot->prix_unitaire, 2) }} €</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <h3>Total : {{ number_format($order->total, 2) }} €</h3>
</body>
</html>
